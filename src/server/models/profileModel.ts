import parser from "../helpers/profileParser";

export default class ProfileModel {

  private store: Array<{
    compiled: string,
    profile: any,
  }> = [];

  public addProfile(profile) {
    const index = this.store.findIndex((ele) => ele.profile.name === profile.name);
    if (index === -1) {
      const compiled = parser(profile);
      const item = {
        compiled,
        profile,
      };
      this.store.push(item);
      return true;
    }
    return false;
  }

  public removeProfile(profile) {
    let storeid;
    if (typeof profile !== "string") {
      storeid = profile.name;
    } else {
      storeid = profile;
    }
    const index = this.store.findIndex((ele) => ele.profile.name === storeid);
    if (index !== -1) {
      this.store.splice(index, 1);
      return true;
    }
    return false;
  }

  public getProfile(name) {
    return this.store.find((val) => val.profile.name === name);
  }

  public getProfiles() {
    return this.store.map((val) => val.profile);
  }
}
