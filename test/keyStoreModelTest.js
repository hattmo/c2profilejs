const assert = require('assert');
const fsp = require('fs').promises;
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
      assert.strictEqual(await keystoremanager.addKeystore(keystoreObj1, opt), true);
      const found = keystoremanager.getKeystore(keystoreObj1.id);
      assert.strictEqual(found.keystore, keystoreObj1);
    });
    it('adds a keystore over another keystore', async () => {
      assert.strictEqual(await keystoremanager.addKeystore(keystoreObj2, opt), false);
      const found = keystoremanager.getKeystore(keystoreObj2.id);
      assert.notStrictEqual(found.keystore, keystoreObj2);
      assert.strictEqual(found.keystore, keystoreObj1);
    });
  });

  describe('removeKeystore Test', () => {
    it('removes the keystore from the manager', async () => {
      assert.strictEqual(await keystoremanager.removeKeystore(keystoreObj1), true);
      assert.strictEqual(keystoremanager.getKeystore(keystoreObj1.id), undefined);
    });
    it('doesnt remove other keystores', async () => {
      assert.strictEqual(await keystoremanager.addKeystore(keystoreObj1, opt), true);
      assert.strictEqual(await keystoremanager.removeKeystore(notkeystoreObj1), false);
      assert.strictEqual(keystoremanager.getKeystore(keystoreObj1.id).keystore, keystoreObj1);
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
