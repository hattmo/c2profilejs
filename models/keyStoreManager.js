const keystores = {
  stores: [],
  /**
   * @param {Object} keystore
   * @param {String} keystore.alias
   * @param {String} keystore.password
   * @param {String} keystore.id
   */
  addKeystore: (keystore) => {
    const index = keystores.stores.findIndex(ele => ele.id === keystore.id);
    if (index !== -1) {
      keystores.stores[index] = keystore;
    } else {
      keystores.stores.push(keystore);
    }
  },
  /**
   * @param {string} keystore keystore name to remove from the manager
   * @param {object} keystore keystore object with keystore name to remove from the manager
   * @param {string} keystore.id keystore name to remove from the manager
   */
  removeKeystore: (keystore) => {
    let storename;
    if (typeof keystore !== 'string') {
      storename = keystore.id;
    } else {
      storename = keystore;
    }
    const index = keystores.stores.findIndex(ele => ele.id === storename);
    if (index !== -1) {
      keystores.stores.splice(index, 1);
    }
  },
  /**
   * Finds and returns a keystore object with the same keystore name ks otherwise returns undefined
   * @param {string} ks keystore name to get keystore object
   */
  getKeystore: ks => keystores.stores.find(val => val.id === ks),

};

module.exports = keystores;
