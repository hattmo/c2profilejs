
$(document).ready(() => {
    loadKeyStores()
    $('#generateBtn').click(() => {
        postKeyStore()
    })
    $('#caBtn').click(()=>{
        postCA()
    })

//     $('#show').click(() => {
//         $('#keystoregen').toggle()
//     })
//   //  $('#keystoregen').hide()
})

function postCA() {
    var formData = new FormData($('#caForm')[0]);
    $.ajax('/cas', {
        url: '/cas',
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData
    });
}

function loadKeyStores() {
    $.get('/keystores', (data, status) => {
        var keystores = data.value
        var output = '<table>'
        keystores.forEach(keystore => {
            output += `<tr><td>${keystore}</td></tr>`
        })
        output += '</table>'
        $('#keystores').html(output)
    })
}

function postKeyStore() {
    $('#generateBtn').prop("disabled", true)
    output = {
        cn: $('#cn').val(),
        ou: $('#ou').val(),
        o: $('#o').val(),
        password: $('#password').val()
    }
    console.log(output)
    $.ajax({
        url: '/keystores',
        type: 'POST',
        data: JSON.stringify(output),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function () {
            $('#generateBtn').prop("disabled", false)
            loadKeyStores()
        }
    });
}