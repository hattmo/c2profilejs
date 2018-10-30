/* eslint no-unused-expressions: 0 */
const assert = require('assert');
const fsp = require('fs').promises;
const { expect } = require('chai');
const keystoremanager = require('../models/keyStoreModel');

describe('keyStoreManager Test', () => {
  const keystoreObj1 = {
    alias: 'mykey1',
    password: 'password1',
    id: 'testKeystore',
  };
  const opt = {
    dname: 'CN=managertest1.com, OU=hattmo, O=universe',
  };
  const keystoreObj2 = {
    alias: 'mykey2',
    password: 'password2',
    id: 'testKeystore',
  };
  const notkeystoreObj1 = {
    alias: 'mykey1',
    password: 'password1',
    id: 'nottestKeystore',
  };


  describe('addkeystore Test', () => {
    it('adds a keystore object to the keystore manager', async () => {
      expect(await keystoremanager.addKeystore(keystoreObj1, opt)).to.be.true;
      const found = keystoremanager.getKeystore(keystoreObj1.id);
      expect(found.keystore).to.equal(keystoreObj1);
    });
    it('adds a keystore over another keystore', async () => {
      expect(await keystoremanager.addKeystore(keystoreObj2, opt)).to.be.false;
      const found = keystoremanager.getKeystore(keystoreObj2.id);
      expect(found.keystore).to.not.equal(keystoreObj2);
      expect(found.keystore).to.equal(keystoreObj1);
    });
  });

  describe('removeKeystore Test', () => {
    it('removes the keystore from the manager', async () => {
      expect(await keystoremanager.removeKeystore(keystoreObj1.id)).to.be.true;
      expect(keystoremanager.getKeystore(keystoreObj1.id)).to.be.undefined;
    });
    it('doesnt remove other keystores', async () => {
      expect(await keystoremanager.addKeystore(keystoreObj1, opt)).to.be.true;
      expect(await keystoremanager.removeKeystore(notkeystoreObj1.id)).to.be.false;
      expect(keystoremanager.getKeystore(keystoreObj1.id).keystore).to.equal(keystoreObj1);
    });
  });
  after(async () => {
    const files = await fsp.readdir('keystores');
    const filePromises = [];
    files.forEach((file) => {
      filePromises.push(fsp.unlink(`keystores/${file}`));
    });
    await Promise.all(filePromises);
  });
});
