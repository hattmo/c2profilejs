var req = new XMLHttpRequest();
req.open('POST','/get')
req.setRequestHeader('Content-type','application/json')
var body = {
    cn: 'testxml',
    ou: 'redteam',
    o: 'universe',
    password: 'mypass'
}
req.send(JSON.stringify(body))
console.log('called')