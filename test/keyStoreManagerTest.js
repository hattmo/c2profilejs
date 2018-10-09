const assert = require('assert');
const keystoremanager = require('../models/keyStoreManager');

describe('keyStoreManager Test', () => {
  const keystoreObj1 = {
    alias: 'mykey1',
    password: 'password1',
    id: 'testKeystore',
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
    it('adds a keystore object to the keystore manager', () => {
      keystoremanager.addKeystore(keystoreObj1);
      const found = keystoremanager.getKeystore(keystoreObj1.id);
      assert.strictEqual(found, keystoreObj1);
    });
    it('adds a keystore over another keystore', () => {
      keystoremanager.addKeystore(keystoreObj2);
      const found = keystoremanager.getKeystore(keystoreObj2.id);
      assert.strictEqual(found, keystoreObj2);
      assert.notStrictEqual(found, keystoreObj1);
    });
  });
  describe('removeKeystore Test', () => {
    it('removes the keystore from the manager', () => {
      keystoremanager.removeKeystore(keystoreObj2);
      const found = keystoremanager.getKeystore(keystoreObj2.id);
      assert.strictEqual(found, undefined);
    });
    it('doesnt remove other keystores', () => {
      keystoremanager.addKeystore(keystoreObj1);
      keystoremanager.removeKeystore(notkeystoreObj1);
      const found = keystoremanager.getKeystore(keystoreObj1.id);
      assert.strictEqual(found, keystoreObj1);
    });
  });
});
