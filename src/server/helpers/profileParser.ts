function buildOptions(opts, tabs) {
  let out = "";
  opts.forEach((opt) => {
    out += `${tabs}set ${opt.key} "${opt.value}";\n`;
  });
  return out;
}

function buildHeadParam(name, opts, tabs) {
  let out = "";
  opts.forEach((opt) => {
    out += `${tabs}${name} "${opt.key}" "${opt.value}";\n`;
  });
  return out;
}

function buildMutation(transform, termination, tabs) {
  let out = "";
  if (transform) {
    transform.forEach((item) => {
      out += `${tabs}${item.key}`;
      out += item.value ? ` "${item.value}";\n` : ";\n";
    });
  }
  out += `${tabs}${termination.key}`;
  out += termination.value ? ` "${termination.value}";\n` : ";\n";
  return out;
}

function buildBlock(opts, tabs) {
  let out = "";
  Object.keys(opts).forEach((key) => {
    if (/httpget|httppost|httpstager|server|client|metadata|output|id/.test(key)) {
      const block = buildBlock(opts[key], `${tabs}\t`);
      out += `${tabs}${key} {\n${block}${tabs}}\n`;
    }
    out += /globaloptions/.test(key) ? buildOptions(opts[key], tabs) : "";
    out += /uri|verb|uri_x86|uri_x64/.test(key) ? `${tabs}set ${key} "${opts[key]}";\n` : "";
    out += /header|parameter/.test(key) ? buildHeadParam(key, opts[key], tabs) : "";
    out += /termination/.test(key) ? buildMutation(opts.transform, opts.termination, tabs) : "";
  });
  return out;
}

export default (model) => buildBlock(model, "");
