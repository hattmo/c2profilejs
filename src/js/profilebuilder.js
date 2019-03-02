module.exports = {
  build: (optdata, $) => {
    const output = {};
    output.name = Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15);

    // globaloptions
    if (optdata.globaloptionList) {
      output.globaloptions = [];
      Object.keys(optdata.globaloptionList).forEach((val) => {
        output.globaloptions.push(optdata.globaloptionList[val]);
      });
    }

    // httpget
    const httpget = {};
    if ($('#httpgeturi').val()) {
      httpget.uri = $('#httpgeturi').val();
    }
    if ($('#httpgetverb').val()) {
      httpget.verb = $('#httpgetverb').val();
    }
    // httpgetclient
    const httpgetclient = {};
    if (optdata.httpgetclientheader) {
      httpgetclient.header = [];
      Object.keys(optdata.httpgetclientheader).forEach((val) => {
        httpgetclient.header.push(optdata.httpgetclientheader[val]);
      });
    }

    console.log(Object.getOwnPropertyNames(httpget));
    if (Object.getOwnPropertyNames(httpget).length > 0) {
      output.httpget = {};
      output.httpget = httpget;
    }
    console.log(output);
    return output;
  },
};
