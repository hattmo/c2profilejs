/* eslint import/no-extraneous-dependencies: 0 */
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
const $ = require('jquery');
const optdata = require('./js/optionsdata');
const profilebuilder = require('./js/profilebuilder');

const headparmsections = [
  'httpgetclientheader',
  'httpgetserverheader',
  'httpgetclientparameter',
  'httpgetserverparameter',
  'httppostclientheader',
  'httppostserverheader',
  'httppostclientparameter',
  'httppostserverparameter',
  'httpstagerheader',
  'httpstagerparameter'];
const tranformsections = [
  'httpgetclienttransform',
  'httpgetservertransform',
  'httppostclienttransform',
  'httppostservertransform',
  'httpstagertransform',
];

function addOption(value, parent, list, index) {
  const pill = $(`
  <a href='javascript:void(0);'>
    <div class="badge badge-pill badge-primary">
      ${value}  x
    </div>
  </a>
  `);
  pill.on('click', () => {
    optdata.clear(list, index);
    pill.remove();
  });
  parent.append(pill);
}
function addTransformEvent(section) {
  $(`#${section}Add`).on('click', () => {
    const key = $(`#${section}Key`).find(':selected').text();
    const value = $(`#${section}Value`).val();
    const id = optdata.add(`${section}List`, { key, value });
    addOption(`${key} ${value}`, $(`#${section}List`), `${section}List`, id);
  });
}
function addHeaderParamEvent(section) {
  $(`#${section}Add`).on('click', () => {
    const key = $(`#${section}Key`).val();
    const value = $(`#${section}Value`).val();
    const id = optdata.add(`${section}List`, { key, value });
    addOption(`${key} ${value}`, $(`#${section}List`), `${section}List`, id);
  });
}

async function postProfiles() {
  const output = profilebuilder.build(optdata, $);
  await fetch('/profiles', {
    method: 'POST',
    body: JSON.stringify(output),
    headers: new Headers({ 'content-type': 'application/json' }),
  });
}

async function getKeyStores() {
  return (await fetch('/keystores')).json();
}

async function getKeystore(store) {
  return (await fetch(`/keystores/${store}`)).json();
}

async function postKeyStores() {
  const cn = $('#cn').val();
  const ou = $('#ou').val();
  const o = $('#o').val();
  const id = $('#id').val();
  const password = $('#password').val();
  const output = {
    keystore: {
      alias: 'mykey',
      password,
      id,
    },
    opt: {
      dname: `CN=${cn}, OU=${ou}, O=${o}`,
    },
  };
  if ($('#sign').is(':checked')) {
    output.ca = $('#signKeystores').find(':selected').text();
  }
  await fetch('/keystores', {
    method: 'POST',
    body: JSON.stringify(output),
    headers: new Headers({ 'content-type': 'application/json' }),
  });
}

function populateKeystores(data) {
  $('#signKeystores').empty();
  data.forEach((item) => {
    $('<option>')
      .val(item)
      .html(item)
      .appendTo($('#signKeystores'));
  });

  Promise.all(data.map(i => getKeystore(i)))
    .then((details) => {
      $('#keystorelist').empty();
      details.forEach((detail) => {
        const collapse = $('<div>')
          .addClass('collapse container-fluid')
          .attr({
            id: `${detail.keystore.id}collapse`,
          })
          .append($('<p>').text(`dname: ${detail.opt.dname}`));
        if (detail.ca) {
          collapse.append($('<p>').text('Signed'));
        } else {
          collapse.append($('<p>').text('Self-Signed'));
        }
        collapse.append($('<a>')
          .attr({
            href: `/keystores/${detail.keystore.id}?download=true`,
          })
          .text('download'));
        $('<div>')
          .addClass('list-group-item list-group-item-action')
          .attr({
            'data-toggle': 'collapse',
            href: `#${detail.keystore.id}collapse`,
          })
          .html(detail.keystore.id)
          .append(collapse)
          .appendTo($('#keystorelist'));
      });
    });
}

window.onload = async () => {
  try {
    populateKeystores(await getKeyStores());
  } catch (reason) {
    console.error(reason);
  }

  $('#generateBtn').on('click', async () => {
    $('#generateBtn').prop('disabled', true);
    await postKeyStores();
    $('#generateBtn').prop('disabled', false);
    populateKeystores(await getKeyStores());
  });

  $('#buildBtn').on('click', async () => {
    $('#buildBtn').prop('disabled', true);
    await postProfiles();
    $('#buildBtn').prop('disabled', false);
    //  populateProfile(await getProfiles());
  });

  $('#sign').on('click', () => {
    if ($('#sign').is(':checked')) {
      $('#signKeystores').prop('disabled', false);
    } else {
      $('#signKeystores').prop('disabled', true);
    }
  });

  $('#globaloptionAdd').on('click', () => {
    const key = $('#globaloptionKey').find(':selected').text();
    const value = $('#globaloptionValue').val();
    const id = optdata.add('globaloptionList', { key, value });
    addOption(`${key} ${value}`, $('#globaloptionList'), 'globaloptionList', id);
  });

  headparmsections.forEach((val) => {
    addHeaderParamEvent(val);
  });
  tranformsections.forEach((val) => {
    addTransformEvent(val);
  });
};
