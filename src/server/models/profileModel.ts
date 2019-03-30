import parser from "../helpers/profileParser";

const profiles = {
  store: [],

  addProfile: (profile) => {
    console.log(profile);
    const index = profiles.store.findIndex((ele) => ele.profile.name === profile.name);
    if (index === -1) {
      const compiled = parser(profile);
      console.log("---compiled----");
      console.log(compiled);
      console.log("---compiled----");
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
    if (typeof profile !== "string") {
      storeid = profile.name;
    } else {
      storeid = profile;
    }
    const index = profiles.store.findIndex((ele) => ele.profile.name === storeid);
    if (index !== -1) {
      profiles.store.splice(index, 1);
      return true;
    }
    return false;
  },

  getProfile: (name) => profiles.store.find((val) => val.profile.name === name),

  /**
   * @returns {array}
   */
  getProfiles: () => profiles.store.map((val) => val.profile),

};

export default profiles;
