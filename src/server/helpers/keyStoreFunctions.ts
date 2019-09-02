import { exec } from "child_process";
import fs from "fs";
import uuid from "uuid/v4";
import util from "util";

const fsp = fs.promises;
const execp = util.promisify(exec);

const keygen = {
  /**
   * Creates the directories temp and keystores if they dont exist
   */
  checkDirs: async (): Promise<void> => {
    const dirsToCreate = [keygen.createDir("./temp"), keygen.createDir("./keystores")];
    await Promise.all(dirsToCreate);
  },
  /**
   * @param {String} dir
   */
  createDir: async (dir: string): Promise<void> => {
    try {
      await fsp.mkdir(dir);
    } catch (err) {
      await Promise.all((await fsp.readdir(dir)).map((file) => fsp.unlink(`${dir}/${file}`)));
    }
  },

  /**
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {Object} ca
   * @param {String} ca.alias
   * @param {String} ca.password
   * @param {String} ca.id
   * @param {String} uniquepath
   */

  signKeyStore: async (keystore, ca, uniquepath: string) => {
    await keygen.certreq(keystore, uniquepath);
    await keygen.gencert(ca, uniquepath);
    await keygen.exportcert(ca, uniquepath, "CA.crt");
    await keygen.importcert({
      alias: "CA",
      password: keystore.password,
      id: keystore.id,
    }, uniquepath, "CA.crt");
    await keygen.importcert(keystore, uniquepath, "temp.crt");
  },
  /**
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {Object} opt
   * @param {String[]} opt.dname
   * @param {Object} [ca]
   * @param {String} [ca.alias]
   * @param {String} [ca.password]
   * @param {String} [ca.id]
   * @returns {Promise}
   */
  generateKeyStore: async (keystore, opt, ca?) => {
    const uniquepath = uuid();
    try {
      await fsp.mkdir(`temp/${uniquepath}`);
      await keygen.genkeypair(keystore, opt, uniquepath);
      if (ca) {
        await keygen.signKeyStore(keystore, ca, uniquepath);
      }
      await fsp.copyFile(`temp/${uniquepath}/${keystore.id}.jks`, `keystores/${keystore.id}.jks`);
    } finally {
      const files = await fsp.readdir(`temp/${uniquepath}`);
      await Promise.all(files.map((file) => fsp.unlink(`temp/${uniquepath}/${file}`)));
      await fsp.rmdir(`temp/${uniquepath}`);
    }
  },
  /**
  *@param {Object[]} dname
  */
  buildOptDName: (dname) => {
    let out = "";
    dname.forEach((val) => {
      out += `${val.key}=${val.value}, `;
    });
    return out.slice(0, out.length - 2);
  },
  /**
   * Creates a keystore at the unique path described in opt.
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {Object} opt
   * @param {String} opt.dname
   * @param {String} uniquepath
   */
  genkeypair: (keystore, opt, uniquepath) => execp(`keytool -genkeypair \
        -alias ${keystore.alias} \
        -keyalg RSA \
        -keysize 2048 \
        -dname "${keygen.buildOptDName(opt.dname)}" \
        -validity 365 \
        -keypass ${keystore.password} \
        -storepass ${keystore.password} \
        -keystore temp/${uniquepath}/${keystore.id}.jks`),
  /**
   * Generates a file called temp.csr at the unique path from the
   * keystore described in opt. The keystore must also be in the unique path.
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {String} uniquepath
   */
  certreq: (keystore, uniquepath) => execp(`keytool -certreq \
        -alias ${keystore.alias} \
        -file temp/${uniquepath}/temp.csr \
        -keypass ${keystore.password} \
        -storepass  ${keystore.password}\
        -keystore temp/${uniquepath}/${keystore.id}.jks`),

  /**
   * Signs temp.csr in the unique path with another certificate from keystores.
   * Outputs a cert named temp.crt in the unique path.
   *
   * @param {Object} keystore
   * @param {String} keystore.alias - alias of the signing key
   * @param {String} keystore.password - signing keystore password
   * @param {String} keystore.id - signing keystore
   * @param {String} uniquepath
   */
  gencert: (keystore, uniquepath) => execp(`keytool -gencert\
        -alias ${keystore.alias}\
        -infile temp/${uniquepath}/temp.csr\
        -outfile temp/${uniquepath}/temp.crt\
        -keypass ${keystore.password}\
        -storepass ${keystore.password}\
        -keystore keystores/${keystore.id}.jks\
        -rfc`),
  /**
   * Exports a cert at alias from keystore to a file named opt.file in the unique path.
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {String} uniquepath
   * @param {String} file
   */
  exportcert: (keystore, uniquepath, file) => execp(`keytool -exportcert\
        -alias ${keystore.alias}\
        -file temp/${uniquepath}/${file}\
        -storepass ${keystore.password}\
        -keystore keystores/${keystore.id}.jks\
        -rfc`),
  /**
   * Imports a certificate with the file name defined in "opt.file" into
   * the keystore 'opt.keystore'.
   * file and keystore must be in the unique path.
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.keystore
   * @param {String} uniquepath
   * @param {String} file
   */
  importcert: (keystore, uniquepath, file) => execp(`keytool -importcert\
            -noprompt -trustcacerts\
            -alias ${keystore.alias}\
            -file temp/${uniquepath}/${file}\
            -keypass ${keystore.password}\
            -storepass ${keystore.password}\
            -keystore temp/${uniquepath}/${keystore.id}.jks`),
};

export default keygen;
