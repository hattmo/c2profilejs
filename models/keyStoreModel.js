const fsp = require('fs').promises;
const keygen = require('../helpers/keyStoreFunctions');

const keystores = {
  store: [],
  /**
   * @param {object} keystore
   * @param {string} keystore.alias
   * @param {string} keystore.password
   * @param {string} keystore.id
   */
  addKeystore: async (keystore, opt, ca) => {
    const index = keystores.store.findIndex(ele => ele.keystore.id === keystore.id);
    if (index === -1) {
      await keygen.generateKeyStore(keystore, opt, ca);
      const item = {
        keystore,
        opt,
        ca,
      };
      keystores.store.push(item);
      return true;
    }
    return false;
  },


  /**
   * @param {string} keystore keystore name to remove from the manager
   * @param {object} keystore keystore object with keystore name to remove from the manager
   * @param {string} keystore.id keystore name to remove from the manager
   */
  removeKeystore: async (keystore) => {
    let storename;
    if (typeof keystore !== 'string') {
      storename = keystore.id;
    } else {
      storename = keystore;
    }
    const index = keystores.store.findIndex(ele => ele.keystore.id === storename);
    if (index !== -1) {
      const { id } = keystores.store[index].keystore;
      keystores.store.splice(index, 1);
      await fsp.unlink(`./keystores/${id}.jks`);
      return true;
    }
    return false;
  },
  /**
   * Finds and returns a keystore object with the same keystore name ks otherwise returns undefined
   * @param {string} id keystore name to get keystore object
   */
  getKeystore: id => keystores.store.find(val => val.keystore.id === id),

  /**
   * @returns {array}
   */
  getKeystores: () => keystores.store.map(item => item.keystore.id),

};

module.exports = keystores;
