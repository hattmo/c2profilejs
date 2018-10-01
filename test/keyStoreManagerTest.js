const keystoremanager = require('../models/keyStoreManager')
const assert = require('assert');

describe('keyStoreManager Test', () => {
    let keystoreObj1 = {
        alias: 'mykey1',
        password: 'password1',
        keystore: 'testKeystore',
    };
    let keystoreObj2 = {
        alias: 'mykey2',
        password: 'password2',
        keystore: 'testKeystore',
    };
    let notkeystoreObj1 = {
        alias: 'mykey1',
        password: 'password1',
        keystore: 'nottestKeystore',
    };


    describe('addkeystore Test', () => {
        it('adds a keystore object to the keystore manager', () => {
            keystoremanager.addKeystore(keystoreObj1);
            const found = keystoremanager.getKeystore(keystoreObj1.keystore);
            assert.strictEqual(found, keystoreObj1);
        })
        it('adds a keystore over another keystore', () => {
            keystoremanager.addKeystore(keystoreObj2);
            const found = keystoremanager.getKeystore(keystoreObj2.keystore);
            assert.strictEqual(found, keystoreObj2);
            assert.notStrictEqual(found, keystoreObj1);
        })
    })
    describe('removeKeystore Test', () => {
        it('removes the keystore from the manager', () => {
            keystoremanager.removeKeystore(keystoreObj2);
            const found = keystoremanager.getKeystore(keystoreObj2.keystore);
            assert.strictEqual(found, undefined)
        })
        it('doesnt remove other keystores', () => {
            keystoremanager.addKeystore(keystoreObj1);
            keystoremanager.removeKeystore(notkeystoreObj1);
            const found = keystoremanager.getKeystore(keystoreObj1.keystore);
            assert.strictEqual(found, keystoreObj1)
        })
    })
})