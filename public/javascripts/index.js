window.onload = () => {
  loadKeyStores();
  document.getElementById('generateBtn').addEventListener('click', () => {
    postKeyStore();
  });
}

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

function loadKeyStores() {
  fetch('/keystores')
    .then((response) => response.json())
    .then((data) => {
      const keystores = data.value;
      let output = '<table>';
      keystores.forEach((keystore) => {
        output += `<tr><td>${keystore}</td></tr>`;
      });
      output += '</table>';
      document.getElementById('keystores').innerHTML = output;
    });
}


function postKeyStore() {
  document.getElementById('generateBtn').disabled = true;
  output = {
    opt: {
      cn: document.getElementById('cn').value,
      ou: document.getElementById('ou').value,
      o: document.getElementById('o').value,
      alias: 'mykey',
      password: document.getElementById('password').value,
      keystore: document.getElementById('cn').value
    }
  };
  fetch('/keystores', {
    method: 'POST',
    body: JSON.stringify(output),
    headers: new Headers({ 'content-type': 'application/json' }),
  })
    .then((res) => {
      if (res.ok) {
        document.getElementById('generateBtn').disabled = false;
        loadKeyStores();
      }
    })
}
