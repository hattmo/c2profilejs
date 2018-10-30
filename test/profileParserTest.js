// const { expect } = require('chai');
const profileparse = require('../helpers/profileParser');

const testObj = {
  globaloptions: [
    {
      key: 'one',
      value: 'two',
    },
  ],
  httpget: {
    uri: '/index.html',
    verb: 'POST',
    client: {
      header: [{ key: 'cookie', value: '12345' }],
    },
  },
};

describe('profileParser Test', () => {
  describe('buildProfile Test', () => {
    it('builds a options block', () => {
      profileparse(testObj);
    });
  });
});
