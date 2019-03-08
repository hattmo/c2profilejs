/* eslint import/no-extraneous-dependencies: 0 */
const uuid = require('uuid');

const optdata = {
  clear: (list, index) => {
    delete optdata[list][index];
  },
  add: (list, item) => {
    if (!optdata[list]) {
      optdata[list] = {};
    }
    const id = uuid.v4();
    optdata[list][id] = item;
    return id;
  },
};

module.exports = optdata;
