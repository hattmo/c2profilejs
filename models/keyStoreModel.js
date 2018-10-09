const { exec } = require('child_process');
const fsp = require('fs').promises;
const fs = require('fs');
const uuid = require('uuid/v4');

const keygen = {
  /**
   * Creates the directories temp and keystores if they dont exist
   */
  checkDirs: () => new Promise((resolve, reject) => {
    const dirsToCreate = [keygen.createDir('./temp'), keygen.createDir('./keystores')];
    Promise.all(dirsToCreate).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    });
  }),
  /**
   * Promisified make directory will resolve if directory exists.
   * @param {String} dir
   */
  createDir: dir => new Promise((resolve, reject) => {
    fs.exists(dir, (exists) => {
      if (!exists) {
        fsp.mkdir(dir).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      } else {
        resolve();
      }
    });
  }),

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

  signKeyStore: (keystore, ca, uniquepath) => new Promise((resolve, reject) => {
    keygen.certreq(keystore, uniquepath)
      .then(() => keygen.gencert(ca, uniquepath))
      .then(() => keygen.exportcert(ca, uniquepath, 'CA.crt'))
      .then(() => keygen.importcert({
        alias: 'CA',
        password: keystore.password,
        id: keystore.id,
      }, uniquepath, 'CA.crt'))
      .then(() => keygen.importcert(keystore, uniquepath, 'temp.crt'))
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  }),
  /**
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {Object} opt
   * @param {String} opt.dname
   * @param {Object} [ca]
   * @param {String} [ca.alias]
   * @param {String} [ca.password]
   * @param {String} [ca.id]
   */
  generateKeyStore: (keystore, opt, ca) => new Promise((resolve, reject) => {
    const uniquepath = uuid();
    fsp.mkdir(`temp/${uniquepath}`)
      .then(() => keygen.genkeypair(keystore, opt, uniquepath))
      .then(() => {
        if (ca) {
          return keygen.signKeyStore(keystore, ca, uniquepath);
        }
        return false;
      })
      .then(() => fsp.copyFile(`temp/${uniquepath}/${keystore.id}.jks`, `keystores/${keystore.id}.jks`))
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        fsp.readdir(`temp/${uniquepath}`).then((files) => {
          const filePromises = [];
          files.forEach((file) => {
            filePromises.push(fsp.unlink(`temp/${uniquepath}/${file}`));
          });
          return Promise.all(filePromises);
        }).then(() => fsp.rmdir(`temp/${uniquepath}`)).catch(() => {
          console.log('Failed to delete files');
        });
      });
  }),

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
  genkeypair: (keystore, opt, uniquepath) => new Promise((resolve, reject) => {
    exec(`keytool -genkeypair \
        -alias ${keystore.alias} \
        -keyalg RSA \
        -keysize 2048 \
        -dname "${opt.dname}" \
        -validity 365 \
        -keypass ${keystore.password} \
        -storepass ${keystore.password} \
        -keystore temp/${uniquepath}/${keystore.id}.jks`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }),
  /**
   * Generates a file called temp.csr at the unique path from the
   * keystore described in opt. The keystore must also be in the unique path.
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {String} uniquepath
   */
  certreq: (keystore, uniquepath) => new Promise((resolve, reject) => {
    exec(`keytool -certreq \
        -alias ${keystore.alias} \
        -file temp/${uniquepath}/temp.csr \
        -keypass ${keystore.password} \
        -storepass  ${keystore.password}\
        -keystore temp/${uniquepath}/${keystore.id}.jks`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }),

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
  gencert: (keystore, uniquepath) => new Promise((resolve, reject) => {
    exec(`keytool -gencert\
        -alias ${keystore.alias}\
        -infile temp/${uniquepath}/temp.csr\
        -outfile temp/${uniquepath}/temp.crt\
        -keypass ${keystore.password}\
        -storepass ${keystore.password}\
        -keystore keystores/${keystore.id}.jks\
        -rfc`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }),
  /**
   * Exports a cert at alias from keystore to a file named opt.file in the unique path.
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   * @param {String} uniquepath
   * @param {String} file
   */
  exportcert: (keystore, uniquepath, file) => new Promise((resolve, reject) => {
    exec(`keytool -exportcert\
        -alias ${keystore.alias}\
        -file temp/${uniquepath}/${file}\
        -storepass ${keystore.password}\
        -keystore keystores/${keystore.id}.jks\
        -rfc`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }),
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
  importcert: (keystore, uniquepath, file) => new Promise((resolve, reject) => {
    exec(`keytool -importcert\
            -noprompt -trustcacerts\
            -alias ${keystore.alias}\
            -file temp/${uniquepath}/${file}\
            -keypass ${keystore.password}\
            -storepass ${keystore.password}\
            -keystore temp/${uniquepath}/${keystore.id}.jks`, (importerror, importstdout, importstderr) => {
      if (importerror) {
        console.log('IMHERE');
        console.log(importstdout);
        console.error(importstderr);
        reject(importerror);
      } else {
        resolve();
      }
    });
  }),
};


module.exports = keygen;
