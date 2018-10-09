function getKeyStores() {
  return new Promise((resolve, reject) => {
    fetch('/keystores')
      .then(response => response.json())
      .then((data) => {
        resolve(data.keystores);
      }).catch((reason) => {
        reject(reason);
      });
  });
}

function postKeyStores() {
  return new Promise((resolve, reject) => {
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
    fetch('/keystores', {
      method: 'POST',
      body: JSON.stringify(output),
      headers: new Headers({ 'content-type': 'application/json' }),
    }).then(() => {
      resolve();
    }).catch((reason) => {
      reject(reason);
    });
  });
}

function populateKeystores(data) {
  const select = document.getElementById('signKeystores');
  while (select.childNodes.length >= 1) {
    select.removeChild(select.firstChild);
  }
  data.forEach((keystore) => {
    const newOption = document.createElement('option');
    newOption.value = keystore.id;
    newOption.text = keystore.id;
    select.appendChild(newOption);
  });
}


window.onload = () => {
  getKeyStores().then((data) => {
    populateKeystores(data);
  }).catch((reason) => {
    console.error(reason);
  });

  document.getElementById('generateBtn').addEventListener('click', () => {
    document.getElementById('generateBtn').disabled = true;
    postKeyStores().then(() => {
      document.getElementById('generateBtn').disabled = false;
      return getKeyStores();
    }).then((data) => {
      populateKeystores(data);
    }).catch((reason) => {
      console.error(reason);
    });
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
