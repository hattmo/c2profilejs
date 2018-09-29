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
   * @param {Object} opt
   * @param {String} opt.alias
   * @param {String} opt.password
   * @param {String} opt.keystore
   * @param {String} uniquepath
   * @param {Object} ca
   * @param {String} ca.alias
   * @param {String} ca.password
   * @param {String} ca.keystore
   */

  signKeyStore: (opt, uniquepath, ca) => new Promise((resolve, reject) => {
    keygen.certreq(opt, uniquepath)
      .then(() => keygen.gencert(ca, uniquepath))
      .then(() => keygen.exportcert(ca, uniquepath, 'CA.crt'))
      .then(() => keygen.importcert({
        alias: 'CA',
        password: opt.password,
        keystore: opt.keystore,
      }, uniquepath, 'CA.crt'))
      .then(() => keygen.importcert(opt, uniquepath, 'temp.crt'))
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  }),
  /**
   * @param {Object} opt
   * @param {String} opt.cn
   * @param {String} opt.ou
   * @param {String} opt.o
   * @param {String} opt.alias
   * @param {String} opt.password
   * @param {String} opt.keystore
   * @param {Object} [ca]
   * @param {String} [ca.alias]
   * @param {String} [ca.password]
   * @param {String} [ca.keystore]
   */
  generateKeyStore: (opt, ca) => new Promise((resolve, reject) => {
    const uniquepath = uuid();
    fsp.mkdir(`temp/${uniquepath}`)
      .then(() => keygen.genkeypair(opt, uniquepath))
      .then(() => {
        if (ca) {
          return keygen.signKeyStore(opt, uniquepath, ca);
        }
        return false;
      })
      .then(() => fsp.copyFile(`temp/${uniquepath}/${opt.keystore}.jks`, `keystores/${opt.keystore}.jks`))
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
   * @param {Object} opt
   * @param {String} opt.cn
   * @param {String} opt.ou
   * @param {String} opt.o
   * @param {String} opt.alias
   * @param {String} opt.password
   * @param {String} opt.keystore
   * @param {String} uniquepath
   */
  genkeypair: (opt, uniquepath) => new Promise((resolve, reject) => {
    exec(`keytool -genkeypair \
        -alias ${opt.alias} \
        -keyalg RSA \
        -keysize 2048 \
        -dname "cn=${opt.cn}, ou=${opt.ou}, o=${opt.o}" \
        -validity 365 \
        -keypass ${opt.password} \
        -storepass ${opt.password} \
        -keystore temp/${uniquepath}/${opt.keystore}.jks`, (error) => {
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
   * @param {Object} opt
   * @param {String} opt.alias
   * @param {String} opt.password
   * @param {String} opt.keystore
   * @param {String} uniquepath
   */
  certreq: (opt, uniquepath) => new Promise((resolve, reject) => {
    exec(`keytool -certreq \
        -alias ${opt.alias} \
        -file temp/${uniquepath}/temp.csr \
        -keypass ${opt.password} \
        -storepass  ${opt.password}\
        -keystore temp/${uniquepath}/${opt.keystore}.jks`, (error) => {
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
   * @param {Object} opt
   * @param {String} opt.alias - alias of the signing key
   * @param {String} opt.password - signing keystore password
   * @param {String} opt.keystore - signing keystore
   * @param {String} uniquepath
   */
  gencert: (opt, uniquepath) => new Promise((resolve, reject) => {
    exec(`keytool -gencert\
        -alias ${opt.alias}\
        -infile temp/${uniquepath}/temp.csr\
        -outfile temp/${uniquepath}/temp.crt\
        -keypass ${opt.password}\
        -storepass ${opt.password}\
        -keystore keystores/${opt.keystore}.jks\
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
   * @param {Object} opt
   * @param {String} opt.alias
   * @param {String} opt.password
   * @param {String} opt.keystore
   * @param {String} uniquepath
   * @param {String} file
   */
  exportcert: (opt, uniquepath, file) => new Promise((resolve, reject) => {
    exec(`keytool -exportcert\
        -alias ${opt.alias}\
        -file temp/${uniquepath}/${file}\
        -storepass ${opt.password}\
        -keystore keystores/${opt.keystore}.jks\
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
   * @param {Object} opt
   * @param {String} opt.alias
   * @param {String} opt.password
   * @param {String} opt.keystore
   * @param {String} uniquepath
   * @param {String} file
   */
  importcert: (opt, uniquepath, file) => new Promise((resolve, reject) => {
    exec(`keytool -importcert\
        -noprompt -trustcacerts\
        -alias ${opt.alias}\
        -file temp/${uniquepath}/${file}\
        -keypass ${opt.password}\
        -storepass ${opt.password}\
        -keystore temp/${uniquepath}/${opt.keystore}.jks`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }),
};


module.exports = keygen;
