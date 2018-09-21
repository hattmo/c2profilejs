
$(document).ready(() => {
    loadKeyStores()
    $('#generateBtn').click(() => {
        postKeyStore()
    })

    $('#cafile').change(() => {
        console.log('file selected')
        //      console.log($('#cafile').prop('files')[0])
        var file = $('#cafile').prop('files')[0]
        $.post('/cas', file)
    })

    $('#show').click(() => {
        $('#keystoregen').toggle()
    })
    $('#keystoregen').hide()
})

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

function postCAs() {

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
    $.ajax ({
        url: '/keystores',
        type: 'POST',
        data: JSON.stringify(output),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(){
            $('#generateBtn').prop("disabled", false)
            loadKeyStores()
        }
    });
}