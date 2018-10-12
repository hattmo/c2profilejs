const assert = require('assert');
const fsp = require('fs').promises;
const fs = require('fs');
const keygen = require('../models/keyStoreModel');

describe('keyStoreModel Test', () => {
  const uniquepath = 'mytestpath';

  const keystore = {
    alias: 'mykey',
    password: 'password',
    id: 'testkeystore',
  };
  const cakeystore = {
    alias: 'ca',
    password: 'password',
    id: 'testcakeystore',
  };
  const opt = {
    dname: 'CN=test.com, OU=hattmo, O=universe',
  };
  const caopt = {
    dname: 'CN=catest.com, OU=hattmo, O=universe',
  };

  before(() => keygen.checkDirs()
    .then(() => fsp.mkdir(`temp/${uniquepath}`)));
  describe('Partial tests', () => {
    describe('CA test', () => {
      describe('genkeypair_CA', () => {
        it('Should generate a keypair', () => keygen.genkeypair(cakeystore, caopt, uniquepath).then(() => {
          fs.exists(`./temp/${uniquepath}/${cakeystore.id}.jks`, (exists) => {
            assert.ok(exists);
          });
        }));
      });

      after(() => fsp.copyFile(`temp/${uniquepath}/${cakeystore.id}.jks`, `keystores/${cakeystore.id}.jks`));
    });

    describe('genkeypair', () => {
      it('Should generate a keypair', () => keygen.genkeypair(keystore, opt, uniquepath).then(() => {
        fs.exists(`./temp/${uniquepath}/${keystore.id}.jks`, (exists) => {
          assert.ok(exists);
        });
      }));
    });

    describe('certreq', () => {
      it('Should generate a certreq', () => keygen.certreq(keystore, uniquepath).then(() => {
        fs.exists(`./temp/${uniquepath}/temp.csr`, (exists) => {
          assert.ok(exists);
        });
      }));
    });

    describe('gencert', () => {
      it('Should generate a signed cert', () => keygen.gencert(cakeystore, uniquepath).then(() => {
        fs.exists(`./temp/${uniquepath}/temp.crt`, (exists) => {
          assert.ok(exists);
        });
      }));
    });

    describe('exportcert', () => {
      it('Should export the CA cert', () => keygen.exportcert(cakeystore, uniquepath, 'CA.crt').then(() => {
        fs.exists(`./temp/${uniquepath}/CA.crt`, (exists) => {
          assert.ok(exists);
        });
      }));
    });

    describe('importcert', () => {
      it('Should import a CA cert', () => keygen.importcert({
        alias: 'CA',
        password: keystore.password,
        id: keystore.id,
      }, uniquepath, 'CA.crt'));
      it('should import a signed cert', () => keygen.importcert(keystore, uniquepath, 'temp.crt'));
    });

    after(() => fsp.readdir(`temp/${uniquepath}`)
      .then((files) => {
        const filePromises = [];
        files.forEach((file) => {
          filePromises.push(fsp.unlink(`temp/${uniquepath}/${file}`));
        });
        return Promise.all(filePromises);
      })
      .then(() => fsp.rmdir(`temp/${uniquepath}`)));
  });


  describe('full tests', () => {
    const fullkeystoreun = {
      alias: 'mykey',
      password: 'password',
      id: 'unsignedfulltestkeystore',
    };
    const fullkeystore = {
      alias: 'mykey',
      password: 'password',
      id: 'signedfulltestkeystore',
    };

    const fulloptun = {
      dname: 'CN=unsignedfulltest.com, OU=hattmo, O=universe',
    };
    const fullopt = {
      dname: 'CN=signedfulltest.com, OU=hattmo, O=universe',
    };

    describe('generateKeyStore', () => {
      it('Should generate a keystore with a unsiqned cert', () => keygen.generateKeyStore(fullkeystoreun, fulloptun));
      it('Should generate a keystore with a signed cert', () => keygen.generateKeyStore(fullkeystore, fullopt, cakeystore));
    });

    after(() => fsp.unlink(`keystores/${fullkeystoreun.id}.jks`)
      .then(() => fsp.unlink(`keystores/${fullkeystore.id}.jks`))
      .then(() => fsp.unlink(`keystores/${cakeystore.id}.jks`)));
  });
});
