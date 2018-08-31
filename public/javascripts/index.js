
$(document).ready(() => {
    loadKeyStores()
    $('#generateBtn').click(() => {
        postKeyStore()
    })
})

function loadKeyStores() {
    $.get('/keystore', (data, status) => {
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
    $('#generateBtn').prop("disabled",true)
    output = {
        cn: $('#cn').val(),
        ou: $('#ou').val(),
        o: $('#o').val(),
        password: $('#password').val()
    }
    $.post('/keystore', output, (data) => {
        $('#generateBtn').prop("disabled",false)
        loadKeyStores()
    })
}