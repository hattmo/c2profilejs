/* eslint import/no-extraneous-dependencies: 0 */
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
const $ = require('jquery');

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

function addGlobalOption(key, value) {
  if ($(`#${key}`).length === 0) {
    const newItem = $('<div>')
      .addClass('row')
      .attr('id', key)
      .append($('<div>')
        .addClass('col-md-3')
        .append($('<p>')
          .text(key)))
      .append($('<div>')
        .addClass('col-md-6')
        .append($('<p>')
          .text(value)))
      .append($('<div>')
        .addClass('col-md-3')
        .append($('<button>')
          .addClass('btn-danger btn-block btn')
          .text('Delete')
          .on('click', () => {
            newItem.remove();
          })));
    $('#globalOptionList').append(newItem);
  }
}

// function download(filename, text) {
//   const element = document.createElement('a');
//   element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
//   element.setAttribute('download', filename);
//   element.style.display = 'none';
//   document.body.appendChild(element);
//   element.click();
//   document.body.removeChild(element);
// }

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

  $('#sign').on('click', () => {
    if ($('#sign').is(':checked')) {
      $('#signKeystores').prop('disabled', false);
    } else {
      $('#signKeystores').prop('disabled', true);
    }
  });

  $('#globalOptionAdd').on('click', () => {
    const key = $('#globalOptionKey').find(':selected').text();
    const value = $('#globalOptionValue').val();
    addGlobalOption(key, value);
  });
};
