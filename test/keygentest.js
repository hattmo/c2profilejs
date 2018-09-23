const assert = require('assert')
const keygen = require('../models/keyStoreModel')
const fsp = require('fs').promises
const fs = require('fs')

describe('keygentest', () => {
    var testUri = 'test.com'
    var testPassword = 'password'
    var uniquepath = 'mytestpath'

    before((done) => {
        keygen.checkDirs().then(() => {
            return fsp.mkdir(`temp/${uniquepath}`)
        }).then(() => {
            fs.exists('cas/CA.jks', (exists) => {
                if (!exists) {
                    fsp.mkdir('temp/tempCA').then(() => {
                        return keygen.genkeypair({
                            cn: 'CA',
                            ou: 'hattmo',
                            o: 'universe',
                            password: 'password',
                            uniquepath: 'tempCA'
                        })
                    }).then(() => {
                        return fsp.copyFile('temp/tempCA/CA.jks', 'cas/CA.jks')
                    }).then(() => {
                        return fsp.unlink('temp/tempCA/CA.jks')
                    }).then(() => {
                        return fsp.rmdir('temp/tempCA')
                    }).then(() => {
                        done()
                    }).catch((err) => {
                        done(err)
                    })
                } else {
                    done()
                }
            })
        }).catch((err) => {
            done(err)
        })
    })

    describe('genkeypair', () => {
        it('should generate a keypair', () => {
            var options = {
                cn: testUri,
                ou: 'hattmo',
                o: 'universe',
                password: testPassword,
                uniquepath: uniquepath
            }
            return keygen.genkeypair(options).then(() => {
                fs.exists(`./temp/${uniquepath}/${testUri}.jks`, (exists) => {
                    assert.ok(exists)
                })
            })
        }).timeout(0)
    })
    describe('certreq', () => {
        it('should generate a certreq', () => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword,
                uniquepath: uniquepath
            }
            return keygen.certreq(options).then(() => {
                fs.exists(`./temp/${uniquepath}/temp.csr`, (exists) => {
                    assert.ok(exists)
                })
            })
        })
    })
    describe('gencert', () => {
        it('should generate a signed cert', () => {
            return keygen.gencert({
                uniquepath: uniquepath
            }).then(() => {
                fs.exists(`./temp/${uniquepath}/temp.crt`, (exists) => {
                    assert.ok(exists)
                })
            })
        })
    })
    describe('exportcert', () => {
        it('should export the CA cert', () => {
            return keygen.exportcert({
                uniquepath: uniquepath
            }).then(() => {
                fs.exists(`./temp/${uniquepath}/CA.crt`, (exists) => {
                    assert.ok(exists)
                })
            })
        })
    })
    describe('importcert', () => {
        it('should import a CA cert', () => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword,
                file: 'CA.crt',
                alias: 'cacert',
                uniquepath: uniquepath
            }
            return keygen.importcert(options)
        })
        it('should import a signed cert', () => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword,
                file: 'temp.crt',
                alias: 'mykey',
                uniquepath: uniquepath
            }
            return keygen.importcert(options)
        })

    })
    describe('generateKeyStore', () => {
        it('should generate a keystore with a signed cert', () => {
            var options = {
                cn: 'fulltest.com',
                ou: 'hattmo',
                o: 'universe',
                password: 'blahblah'
            }
            return keygen.generateKeyStore(options)
        }).timeout(0)
    })

    after(() => {
        return fsp.readdir(`temp/${uniquepath}`).then((files) => {
            filePromises = []
            files.forEach(file => {
                filePromises.push(fsp.unlink(`temp/${uniquepath}/${file}`))
            });
            return Promise.all(filePromises)
        }).then(() => {
            return fsp.rmdir(`temp/${uniquepath}`)
        }).then(() => {
            return fsp.unlink('keystores/fulltest.com.jks')
        })
    })
})