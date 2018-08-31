const assert = require('assert')
const keygen = require('../models/keyStoreModel')
const fs = require('fs')
const { each } = require('async')
describe('keygentest', () => {
    var testUri = 'test.com'
    var testPassword = 'password'
    
    before((done) => {
        fs.readdir('./temp', (err, files) => {
            if (err) {
                done(err)
            } else {
                each(files, (file, cb) => {
                    fs.unlinkSync(`./temp/${file}`)
                    cb()
                }, (err) => {
                    if (!err) {
                        fs.exists('cas/CA.jks', (exists) => {
                            if (exists) {
                                done()
                            } else {
                                keygen.genkeypair({
                                    cn: 'CA',
                                    ou: 'hattmo',
                                    o: 'universe',
                                    password: 'password'
                                }, (err) => {
                                    fs.copyFile('temp/CA.jks', 'cas/CA.jks', (err) => {
                                        if (err) {
                                            done(err)
                                        } else {
                                            fs.unlink('temp/CA.jks', (err) => {
                                                done(err)
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    })
    describe('genkeypair', () => {
        it('should generate a keypair', (done) => {
            var options = {
                cn: testUri,
                ou: 'test',
                o: 'world',
                password: testPassword
            }
            keygen.genkeypair(options, (err) => {
                fs.exists(`./temp/${testUri}.jks`, (exists) => {
                    assert.ok(exists)
                    done(err)
                })
            })
        })
    })
    describe('certreq', () => {
        it('should generate a certreq', (done) => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword
            }
            keygen.certreq(options, (err) => {
                fs.exists(`./temp/temp.csr`, (exists) => {
                    assert.ok(exists)
                    done(err)
                })
            })

        })
    })
    describe('gencert', () => {
        it('should generate a signed cert', (done) => {
            keygen.gencert((err) => {
                fs.exists(`./temp/temp.crt`, (exists) => {
                    assert.ok(exists)
                    done(err)
                })
            })
        })
    })
    describe('exportcert', () => {
        it('should export the CA cert', (done) => {
            keygen.exportcert((err) => {
                fs.exists(`./temp/CA.crt`, (exists) => {
                    assert.ok(exists)
                    done(err)
                })
            })
        })
    })
    describe('importcert', () => {
        it('should import a signed cert', (done) => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword,
                file: 'temp.crt',
                alias: 'mykey'
            }
            keygen.importcert(options, (err) => {
                done(err)
            })
        })
        it('should import a CA cert', (done) => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword,
                file: 'CA.crt',
                alias: 'cacert'
            }
            keygen.importcert(options, (err) => {
                done(err)
            })
        })
    })
    describe('generateKeyStore', () => {
        it('should generate a keystore with a signed cert', (done) => {
            var options = {
                cn: 'pooba.com',
                ou: 'hattmo',
                o: 'universe',
                password: 'blahblah'
            }
            keygen.generateKeyStore(options, (err, keystore) => {
                if (!err) {
                    assert.ok(keystore)
                }
                done(err)
            })
        }).timeout(0)
    })
}).timeout(0)