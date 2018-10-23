/* eslint import/no-extraneous-dependencies: 0 */
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
require('./style.css');

async function getKeyStores() {
  const response = await fetch('/keystores');
  return response.json();
}

async function postKeyStores() {
  const cn = document.getElementById('cn').value;
  const ou = document.getElementById('ou').value;
  const o = document.getElementById('o').value;
  const id = document.getElementById('id').value;
  const password = document.getElementById('password').value;
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
  if (document.getElementById('sign').checked) {
    const select = document.getElementById('signKeystores');
    output.ca = select.options[select.selectedIndex].value;
  }
  await fetch('/keystores', {
    method: 'POST',
    body: JSON.stringify(output),
    headers: new Headers({ 'content-type': 'application/json' }),
  });
}

function populateKeystores(data) {
  const select = document.getElementById('signKeystores');
  while (select.childNodes.length >= 1) {
    select.removeChild(select.firstChild);
  }
  data.forEach((keystore) => {
    const newOption = document.createElement('option');
    newOption.value = keystore;
    newOption.text = keystore;
    select.appendChild(newOption);
  });
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

  document.getElementById('generateBtn').addEventListener('click', async () => {
    try {
      document.getElementById('generateBtn').disabled = true;
      await postKeyStores();
      document.getElementById('generateBtn').disabled = false;
      populateKeystores(await getKeyStores());
    } catch (reason) {
      console.error(reason);
    }
  });

  document.getElementById('sign').addEventListener('click', () => {
    if (document.getElementById('sign').checked === true) {
      document.getElementById('signKeystores').disabled = false;
    } else {
      document.getElementById('signKeystores').disabled = true;
    }
  });
};

//     $('#show').click(() => {
//         $('#keystoregen').toggle()
//     })
//   ('#keystoregen').hide()

// function postCA() {
//   const formData = new FormData($('#caForm')[0]);
//   $.ajax('/cas', {
//     url: '/cas',
//     type: 'POST',
//     processData: false,
//     contentType: false,
//     data: formData,
//   });
// }
