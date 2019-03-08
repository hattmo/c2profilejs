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
    let caparams;
    if (ca) {
      caparams = keystores.getKeystore(ca).keystore;
    }
    const index = keystores.store.findIndex(ele => ele.keystore.id === keystore.id);
    if (index === -1) {
      await keygen.generateKeyStore(keystore, opt, caparams);
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
   */
  removeKeystore: async (storename) => {
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
  getKeystores: () => keystores.store, // .map(item => item.keystore.id),

};

module.exports = keystores;
