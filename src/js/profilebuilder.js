

module.exports = {
  build: (optdata, $) => {
    const output = {};
    output.name = 'testprofile';

    // globaloptions
    if (optdata.globaloptionList) {
      output.globaloptions = [];
      Object.keys(optdata.globaloptionList).forEach((val) => {
        output.globaloptions.push(optdata.globaloptionList[val]);
      });
    }

    // httpget
    output.httpget = {};
    if ($('#httpgeturi').val()) {
      console.log('exists');
    } else {
      console.log('doesnt');
    }

    return output;
  },
};
