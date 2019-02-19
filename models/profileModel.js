const parser = require('../helpers/profileParser');

const profiles = {
  store: [],

  addProfile: (profile) => {
    const index = profiles.store.findIndex(ele => ele.profile.id === profile.id);
    if (index === -1) {
      const compiled = parser(profile);
      console.log(compiled);
      const item = {
        compiled,
        profile,
      };
      profiles.store.push(item);
      return true;
    }
    return false;
  },

  removeProfile: (profile) => {
    let storeid;
    if (typeof profile !== 'string') {
      storeid = profile.id;
    } else {
      storeid = profile;
    }
    const index = profiles.store.findIndex(ele => ele.profile.id === storeid);
    if (index !== -1) {
      profiles.store.splice(index, 1);
      return true;
    }
    return false;
  },

  getProfile: id => profiles.store.find(val => val.profile.id === id),

  /**
   * @returns {array}
   */
  getKeystores: () => profiles.store.map(item => item.profile.id),

};

module.exports = profiles;
