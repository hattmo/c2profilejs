const assert = require('assert')
const keygen = require('../models/keyStoreModel')
const fs = require('fs')
const { each } = require('async')
describe('keygentest', () => {
    var testUri = 'test.com'
    var testPassword = 'password'
    var uniquepath = 'mytestpath'

    before((done) => {
        fs.mkdir(`temp/${uniquepath}`, (err) => {
            if (err) {
                done(err)
            } else {
                fs.exists('cas/CA.jks', (exists) => {
                    if (exists) {
                        done()
                    } else {
                        fs.mkdir('temp/tempCA', (err) => {
                            keygen.genkeypair({
                                cn: 'CA',
                                ou: 'hattmo',
                                o: 'universe',
                                password: 'password',
                                uniquepath: 'tempCA'
                            }, (err) => {
                                if (err) {
                                    done(err)
                                } else {
                                    fs.copyFile('temp/tempCA/CA.jks', 'cas/CA.jks', (err) => {
                                        if (err) {
                                            done(err)
                                        } else {
                                            fs.unlink('temp/tempCA/CA.jks', (err) => {
                                                if (err) {
                                                    done(err)
                                                } else {
                                                    fs.rmdir('temp/tempCA', (err) => {
                                                        done(err)
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
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
                ou: 'hattmo',
                o: 'universe',
                password: testPassword,
                uniquepath: uniquepath
            }
            keygen.genkeypair(options, (err) => {
                fs.exists(`./temp/${uniquepath}/${testUri}.jks`, (exists) => {
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
                password: testPassword,
                uniquepath: uniquepath
            }
            keygen.certreq(options, (err) => {
                fs.exists(`./temp/${uniquepath}/temp.csr`, (exists) => {
                    assert.ok(exists)
                    done(err)
                })
            })

        })
    })
    describe('gencert', () => {
        it('should generate a signed cert', (done) => {
            keygen.gencert({
                uniquepath: uniquepath
            }, (err) => {
                fs.exists(`./temp/${uniquepath}/temp.crt`, (exists) => {
                    assert.ok(exists)
                    done(err)
                })
            })
        })
    })
    describe('exportcert', () => {
        it('should export the CA cert', (done) => {
            keygen.exportcert({
                uniquepath: uniquepath
            }, (err) => {
                fs.exists(`./temp/${uniquepath}/CA.crt`, (exists) => {
                    assert.ok(exists)
                    done(err)
                })
            })
        })
    })
    describe('importcert', () => {
        it('should import a CA cert', (done) => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword,
                file: 'CA.crt',
                alias: 'cacert',
                uniquepath: uniquepath
            }
            keygen.importcert(options, (err) => {
                done(err)
            })
        })
        it('should import a signed cert', (done) => {
            var options = {
                keystore: `${testUri}.jks`,
                password: testPassword,
                file: 'temp.crt',
                alias: 'mykey',
                uniquepath: uniquepath
            }
            keygen.importcert(options, (err) => {
                done(err)
            })
        })

    })
    describe('generateKeyStore', () => {
        it('should generate a keystore with a signed cert', (done) => {
            var options = {
                cn: 'fulltest.com',
                ou: 'hattmo',
                o: 'universe',
                password: 'blahblah'
            }
            keygen.generateKeyStore(options, (err) => {
                done(err)
            })
        }).timeout(0)
    })

    after((done) => {
        fs.readdir(`temp/${uniquepath}`, (err, files) => {
            if (err) {
                done(err)
            } else {
                each(files, (file, cb) => {
                    fs.unlink(`temp/${uniquepath}/${file}`, (err) => {
                        cb(err)
                    })
                }, (err) => {
                    if (!err) {
                        fs.rmdir(`temp/${uniquepath}`, (err) => {
                            if (err) {
                                done(err)
                            } else {
                                fs.unlink('keystores/fulltest.com.jks', (err) => {
                                    done(err)
                                })
                            }
                        })
                    } else {
                        done(err)
                    }
                })
            }
        })
    })
}).timeout(0)