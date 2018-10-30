function buildOptions(opts, tabs) {
  let out = '';
  opts.forEach((opt) => {
    out += `${tabs}set ${opt.key} "${opt.value}";\n`;
  });
  return out;
}

function buildHeadParam(name, opts, tabs) {
  let out = '';
  opts.forEach((opt) => {
    out += `${tabs}${name} "${opt.key}" "${opt.value}";\n`;
  });
  return out;
}

function buildMutation(transformation, termination, tabs) {
  let out = '';
  if (transformation) {
    transformation.forEach((val) => {
      out += `${tabs}${val}\n`;
    });
  }
  out += `${tabs}${termination}\n`;
  return out;
}

function buildBlock(opts, tabs) {
  let out = '';
  Object.keys(opts).forEach((key) => {
    if (/httpget|httppost|httpstager|server|client|metadata|output|id/.test(key)) {
      const block = buildBlock(opts[key], `${tabs}\t`);
      out += `${tabs}${key} {\n${block}${tabs}}\n`;
    }
    out += /globaloptions/.test(key) ? buildOptions(opts[key], tabs) : '';
    out += /uri|verb|uri_x86|uri_x64/.test(key) ? `${tabs}set ${key} "${opts[key]}";\n` : '';
    out += /header|parameter/.test(key) ? buildHeadParam(key, opts[key], tabs) : '';
    out += /termination/.test(key) ? buildMutation(opts.transformation, opts.termination, tabs) : '';
  });
  return out;
}

module.exports = model => buildBlock(model, '');
