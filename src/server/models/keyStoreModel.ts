import fs from "fs";
import keygen from "../helpers/keyStoreFunctions";

export default class KeystoreModel {
  private fsp = fs.promises;

  private store: Array<{
    keystore: any,
    opt: string,
    ca?: string,
  }> = [];
  /**
   * @param {object} keystore
   * @param {string} keystore.alias
   * @param {string} keystore.password
   * @param {string} keystore.id
   */
  public async addKeystore(keystore, opt, ca?) {
    let caparams;
    if (ca) {
      const castore = this.getKeystore(ca);
      if (castore !== undefined) {
        caparams = castore.keystore;
      } else {
        return false;
      }
    }
    const index = this.store.findIndex((ele) => ele.keystore.id === keystore.id);
    if (index === -1) {
      await keygen.generateKeyStore(keystore, opt, caparams);
      const item = {
        keystore,
        opt,
        ca,
      };
      this.store.push(item);
      return true;
    }
    return false;
  }

  /**
   * @param {string} keystore keystore name to remove from the manager
   */
  public async removeKeystore(storename) {
    const index = this.store.findIndex((ele) => ele.keystore.id === storename);
    if (index !== -1) {
      const { id } = this.store[index].keystore;
      this.store.splice(index, 1);
      await this.fsp.unlink(`./keystores/${id}.jks`);
      return true;
    }
    return false;
  }

  /**
   * Finds and returns a keystore object with the same keystore name ks otherwise returns undefined
   * @param {string} id keystore name to get keystore object
   */
  public getKeystore(id) {
    return this.store.find((val) => val.keystore.id === id);
  }

  /**
   * @returns {array}
   */
  public getKeystores() {
    return this.store;
  }

}
