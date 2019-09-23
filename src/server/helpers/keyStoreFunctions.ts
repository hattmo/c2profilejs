import { exec } from "child_process";
import fs from "fs";
import util from "util";
import uuid from "uuid/v4";

const fsp = fs.promises;
const execp = util.promisify(exec);

const keygen = {
  checkDirs: async (): Promise<void> => {
    const dirsToCreate = [keygen.createDir("./temp"), keygen.createDir("./keystores")];
    await Promise.all(dirsToCreate);
  },

  createDir: async (dir: string): Promise<void> => {
    try {
      await fsp.mkdir(dir);
    } catch (err) {
      await Promise.all((await fsp.readdir(dir)).map((file) => fsp.unlink(`${dir}/${file}`)));
    }
  },

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

  buildOptDName: (dname) => {
    let out = "";
    dname.forEach((val) => {
      out += `${val.key}=${val.value}, `;
    });
    return out.slice(0, out.length - 2);
  },

  genkeypair: (keystore, opt, uniquepath) => execp(`keytool -genkeypair \
        -alias ${keystore.alias} \
        -keyalg RSA \
        -keysize 2048 \
        -dname "${keygen.buildOptDName(opt.dname)}" \
        -validity 365 \
        -keypass ${keystore.password} \
        -storepass ${keystore.password} \
        -keystore temp/${uniquepath}/${keystore.id}.jks`),
  certreq: (keystore, uniquepath) => execp(`keytool -certreq \
        -alias ${keystore.alias} \
        -file temp/${uniquepath}/temp.csr \
        -keypass ${keystore.password} \
        -storepass  ${keystore.password}\
        -keystore temp/${uniquepath}/${keystore.id}.jks`),

  gencert: (keystore, uniquepath) => execp(`keytool -gencert\
        -alias ${keystore.alias}\
        -infile temp/${uniquepath}/temp.csr\
        -outfile temp/${uniquepath}/temp.crt\
        -keypass ${keystore.password}\
        -storepass ${keystore.password}\
        -keystore keystores/${keystore.id}.jks\
        -rfc`),

  exportcert: (keystore, uniquepath, file) => execp(`keytool -exportcert\
        -alias ${keystore.alias}\
        -file temp/${uniquepath}/${file}\
        -storepass ${keystore.password}\
        -keystore keystores/${keystore.id}.jks\
        -rfc`),

  importcert: (keystore, uniquepath, file) => execp(`keytool -importcert\
            -noprompt -trustcacerts\
            -alias ${keystore.alias}\
            -file temp/${uniquepath}/${file}\
            -keypass ${keystore.password}\
            -storepass ${keystore.password}\
            -keystore temp/${uniquepath}/${keystore.id}.jks`),
};

export default keygen;
