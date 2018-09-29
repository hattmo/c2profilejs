const assert = require('assert');
const fsp = require('fs').promises;
const fs = require('fs');
const keygen = require('../models/keyStoreModel');

describe('Keygenmodel Test', () => {

  const uniquepath = 'mytestpath';

  const options = {
    cn: 'test.com',
    ou: 'hattmo',
    o: 'universe',
    alias: 'mykey',
    password: 'password',
    keystore: 'testkeystore',
  };
  const caOptions = {
    cn: 'ca.com',
    ou: 'hattmo',
    o: 'universe',
    alias: 'ca',
    password: 'password',
    keystore: 'testcakeystore',
  }

  before(() => {
    return keygen.checkDirs()
      .then(() => fsp.mkdir(`temp/${uniquepath}`))
  });
  describe('Partial tests', () => {
    describe('CA test', () => {
      describe('genkeypair_CA', () => {
        it('Should generate a keypair', () => {
          return keygen.genkeypair(caOptions, uniquepath).then(() => {
            fs.exists(`./temp/${uniquepath}/${caOptions.keystore}.jks`, (exists) => {
              assert.ok(exists);
            });
          });
        }).timeout(0);
      });

      after(() => fsp.copyFile(`temp/${uniquepath}/${caOptions.keystore}.jks`, `keystores/${caOptions.keystore}.jks`))
    })

    describe('genkeypair', () => {
      it('Should generate a keypair', () => {
        return keygen.genkeypair(options, uniquepath).then(() => {
          fs.exists(`./temp/${uniquepath}/${options.keystore}.jks`, (exists) => {
            assert.ok(exists);
          });
        });
      }).timeout(0);
    })

    describe('certreq', () => {
      it('Should generate a certreq', () => {
        return keygen.certreq(options, uniquepath).then(() => {
          fs.exists(`./temp/${uniquepath}/temp.csr`, (exists) => {
            assert.ok(exists);
          });
        });
      });
    });

    describe('gencert', () => {
      it('Should generate a signed cert', () => keygen.gencert(caOptions, uniquepath).then(() => {
        fs.exists(`./temp/${uniquepath}/temp.crt`, (exists) => {
          assert.ok(exists);
        });
      }));
    });

    describe('exportcert', () => {
      it('Should export the CA cert', () => keygen.exportcert(caOptions, uniquepath, 'CA.crt').then(() => {
        fs.exists(`./temp/${uniquepath}/CA.crt`, (exists) => {
          assert.ok(exists);
        });
      }));
    });

    describe('importcert', () => {
      it('Should import a CA cert', () => keygen.importcert({
        alias: 'CA',
        password: options.password,
        keystore: options.keystore,
      }, uniquepath, 'CA.crt'));
      it('should import a signed cert', () => keygen.importcert(options, uniquepath, 'temp.crt'));
    });

    after(() => fsp.readdir(`temp/${uniquepath}`)
      .then((files) => {
        filePromises = [];
        files.forEach((file) => {
          filePromises.push(fsp.unlink(`temp/${uniquepath}/${file}`));
        });
        return Promise.all(filePromises);
      })
      .then(() => fsp.rmdir(`temp/${uniquepath}`)));
  })


  describe('full tests', () => {
    const fulloptionsUn = {
      cn: 'unsignedfulltest.com',
      ou: 'hattmo',
      o: 'universe',
      alias: 'mykey',
      password: 'password',
      keystore: 'unsignedfulltestkeystore',
    };
    const fulloptions = {
      cn: 'signedfulltest.com',
      ou: 'hattmo',
      o: 'universe',
      alias: 'mykey',
      password: 'password',
      keystore: 'signedfulltestkeystore',
    };
    describe('generateKeyStore', () => {
      it('Should generate a keystore with a unsiqned cert', () => keygen.generateKeyStore(fulloptionsUn)).timeout(0);
      it('Should generate a keystore with a signed cert', () => keygen.generateKeyStore(fulloptions, caOptions)).timeout(0);
    });

    after(() => fsp.unlink(`keystores/${fulloptionsUn.keystore}.jks`)
      .then(() => fsp.unlink(`keystores/${fulloptions.keystore}.jks`))
      .then(() => fsp.unlink(`keystores/${caOptions.keystore}.jks`)));
  })
})
