const assert = require('assert');
const fsp = require('fs').promises;
const fs = require('fs');
const keygen = require('../models/keyStoreModel');

describe('keygentest', () => {
  const testUri = 'test.com';
  const testPassword = 'password';
  const uniquepath = 'mytestpath';

  before((done) => {
    keygen.checkDirs().then(() => fsp.mkdir(`temp/${uniquepath}`)).then(() => {
      fs.exists('cas/CA.jks', (exists) => {
        if (!exists) {
          fsp.mkdir('temp/tempCA').then(() => keygen.genkeypair({
            cn: 'CA',
            ou: 'hattmo',
            o: 'universe',
            password: 'password',
            uniquepath: 'tempCA',
          })).then(() => fsp.copyFile('temp/tempCA/CA.jks', 'cas/CA.jks')).then(() => fsp.unlink('temp/tempCA/CA.jks'))
            .then(() => fsp.rmdir('temp/tempCA'))
            .then(() => {
              done();
            })
            .catch((err) => {
              done(err);
            });
        } else {
          done();
        }
      });
    }).catch((err) => {
      done(err);
    });
  });

  describe('genkeypair', () => {
    it('should generate a keypair', () => {
      const options = {
        cn: testUri,
        ou: 'hattmo',
        o: 'universe',
        password: testPassword,
        uniquepath,
      };
      return keygen.genkeypair(options).then(() => {
        fs.exists(`./temp/${uniquepath}/${testUri}.jks`, (exists) => {
          assert.ok(exists);
        });
      });
    }).timeout(0);
  });
  describe('certreq', () => {
    it('should generate a certreq', () => {
      const options = {
        keystore: `${testUri}.jks`,
        password: testPassword,
        uniquepath,
      };
      return keygen.certreq(options).then(() => {
        fs.exists(`./temp/${uniquepath}/temp.csr`, (exists) => {
          assert.ok(exists);
        });
      });
    });
  });
  describe('gencert', () => {
    it('should generate a signed cert', () => keygen.gencert({
      uniquepath,
    }).then(() => {
      fs.exists(`./temp/${uniquepath}/temp.crt`, (exists) => {
        assert.ok(exists);
      });
    }));
  });
  describe('exportcert', () => {
    it('should export the CA cert', () => keygen.exportcert({
      uniquepath,
    }).then(() => {
      fs.exists(`./temp/${uniquepath}/CA.crt`, (exists) => {
        assert.ok(exists);
      });
    }));
  });
  describe('importcert', () => {
    it('should import a CA cert', () => {
      const options = {
        keystore: `${testUri}.jks`,
        password: testPassword,
        file: 'CA.crt',
        alias: 'cacert',
        uniquepath,
      };
      return keygen.importcert(options);
    });
    it('should import a signed cert', () => {
      const options = {
        keystore: `${testUri}.jks`,
        password: testPassword,
        file: 'temp.crt',
        alias: 'mykey',
        uniquepath,
      };
      return keygen.importcert(options);
    });
  });
  describe('generateKeyStore', () => {
    it('should generate a keystore with a signed cert', () => {
      const options = {
        cn: 'fulltest.com',
        ou: 'hattmo',
        o: 'universe',
        password: 'blahblah',
      };
      return keygen.generateKeyStore(options);
    }).timeout(0);
  });

  after(() => fsp.readdir(`temp/${uniquepath}`).then((files) => {
    filePromises = [];
    files.forEach((file) => {
      filePromises.push(fsp.unlink(`temp/${uniquepath}/${file}`));
    });
    return Promise.all(filePromises);
  }).then(() => fsp.rmdir(`temp/${uniquepath}`)).then(() => fsp.unlink('keystores/fulltest.com.jks')));
});
