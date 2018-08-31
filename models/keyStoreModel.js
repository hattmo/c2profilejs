const { exec } = require('child_process')
const fs = require('fs')
const uuid = require('uuid/v4')
const { each } = require('async')

if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp')
}
if (!fs.existsSync('./cas')) {
    fs.mkdirSync('./cas')
}
if (!fs.existsSync('./certs')) {
    fs.mkdirSync('./certs')
}

let keygen = {


    //      opt = {
    //         cn:
    //         ou:
    //         o:
    //         password:
    //     }
    generateKeyStore: (opt, cb) => {
        var uniquepath = uuid()
        fs.mkdir(`temp/${uniquepath}`, (err) => {
            if (err) {
                cb(err)
                return
            }
            keygen.genkeypair({
                cn: opt.cn,
                ou: opt.ou,
                o: opt.o,
                password: opt.password,
                uniquepath: uniquepath
            }, (err) => {
                if (err) {
                    cb(err)
                    return
                }
                keygen.certreq({
                    keystore: `${opt.cn}.jks`,
                    password: opt.password,
                    uniquepath: uniquepath
                }, (err) => {
                    if (err) {
                        cb(err)
                        return
                    }
                    keygen.gencert({
                        uniquepath: uniquepath
                    }, (err) => {
                        if (err) {
                            cb(err)
                            return
                        }
                        keygen.exportcert({
                            uniquepath: uniquepath
                        }, (err) => {
                            if (err) {
                                cb(err)
                                return
                            }
                            keygen.importcert({
                                keystore: `${opt.cn}.jks`,
                                password: opt.password,
                                file: 'CA.crt',
                                alias: 'cacert',
                                uniquepath: uniquepath
                            }, (err) => {
                                if (err) {
                                    cb(err)
                                    return
                                }
                                keygen.importcert({
                                    keystore: `${opt.cn}.jks`,
                                    password: opt.password,
                                    file: 'temp.crt',
                                    alias: 'mykey',
                                    uniquepath: uniquepath
                                }, (err) => {
                                    if (err) {
                                        cb(err)
                                        return
                                    }
                                    fs.copyFile(`temp/${uniquepath}/${opt.cn}.jks`, `certs/${opt.cn}.jks`, (err, contents) => {
                                        console.log('copied')
                                        cb(err)
                                        fs.readdir(`temp/${uniquepath}`, (err, files) => {
                                            if (err) {
                                                console.log(err)
                                                return
                                            }
                                            each(files, (file, cb) => {
                                                fs.unlink(`temp/${uniquepath}/${file}`, (err) => {
                                                    cb(err)
                                                })
                                            }, (err) => {
                                                if (!err) {
                                                    fs.rmdir(`temp/${uniquepath}`, (err) => {
                                                        console.log(err)
                                                        return
                                                    })
                                                } else {
                                                    console.log(err)
                                                    return
                                                }
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    },

    genkeypair: (opt, cb) => {
        console.log('in genkeypair')
        console.log(opt)
        console.log('called gen key pair')
        exec(`keytool -genkeypair \
        -alias mykey \
        -keyalg RSA \
        -keysize 2048 \
        -dname "cn=${opt.cn}, ou=${opt.ou}, o=${opt.o}" \
        -validity 365 \
        -keypass ${opt.password} \
        -storepass ${opt.password} \
        -keystore temp/${opt.uniquepath}/${opt.cn}.jks`, (error, stdout, stderr) => {
                cb(error)
            })
    },
    certreq: (opt, cb) => {
        console.log('called cert req')
        exec(`keytool -certreq \
        -alias mykey \
        -file temp/${opt.uniquepath}/temp.csr \
        -keypass ${opt.password} \
        -storepass  ${opt.password}\
        -keystore temp/${opt.uniquepath}/${opt.keystore}`, (error, stdout, stderr) => {
                cb(error)
            })
    },
    gencert: (opt, cb) => {
        console.log('called gencert')
        exec(`keytool -gencert\
        -alias mykey\
        -infile temp/${opt.uniquepath}/temp.csr\
        -outfile temp/${opt.uniquepath}/temp.crt\
        -keypass password\
        -storepass password\
        -keystore cas/CA.jks\
        -rfc`, (error, stdout, stderr) => {
                cb(error)
            })
    },
    exportcert: (opt, cb) => {
        console.log('called export cert')
        exec(`keytool -exportcert\
        -alias mykey\
        -file temp/${opt.uniquepath}/CA.crt\
        -storepass password\
        -keystore cas/CA.jks\
        -rfc`, (error, stdout, stderr) => {
                cb(error)
            })
    },
    importcert: (opt, cb) => {
        console.log('called import cert')
        exec(`keytool -importcert\
        -noprompt -trustcacerts\
        -alias ${opt.alias}\
        -file temp/${opt.uniquepath}/${opt.file}\
        -keypass ${opt.password}\
        -storepass ${opt.password}\
        -keystore temp/${opt.uniquepath}/${opt.keystore}`, (error, stdout, stderr) => {
                cb(error)
            })
    }

}



module.exports = keygen