const keystores = {
  stores: [],
  /**
   * @param {Object} opt
   * @param {String} opt.alias
   * @param {String} opt.password
   * @param {String} opt.keystore
   */
  addKeystore: (opt) => {
    const index = keystores.stores.findIndex(ele => ele.keystore === opt.keystore);
    if (index !== -1) {
      keystores.stores[index] = opt;
    } else {
      keystores.stores.push(opt);
    }
  },
  /**
   * @param {string} opt keystore name to remove from the manager
   * @param {object} opt keystore object with keystore name to remove from the manager
   * @param {string} opt.keystore keystore name to remove from the manager
   */
  removeKeystore: (opt) => {
    let storename;
    if (typeof opt !== 'string') {
      storename = opt.keystore;
    } else {
      storename = opt;
    }
    const index = keystores.stores.findIndex(ele => ele.keystore === storename);
    if (index !== -1) {
      keystores.stores.splice(index, 1);
    }
  },
  /**
   * Finds and returns a keystore object with the same keystore name ks otherwise returns undefined
   * @param {string} ks keystore name to get keystore object
   */
  getKeystore: ks => keystores.stores.find(val => val.keystore === ks),

};

module.exports = keystores;
