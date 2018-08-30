const { exec } = require('child_process')
const fs = require('fs')
if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp')
}
if (!fs.existsSync('./CA')) {
    fs.mkdirSync('./CA')
}

let keygen = {


    //      opt = {
    //         cn:
    //         ou:
    //         o:
    //         password:
    //     }
    generateKeyStore: (opt, cb) => {
        keygen.genkeypair({
            cn: opt.cn,
            ou: opt.ou,
            o: opt.o,
            password: opt.password
        }, (err) => {
            if (err) {
                cb(err)
            }
            keygen.certreq({
                keystore: `${opt.cn}.jks`,
                password: opt.password
            }, (err) => {
                if (err) {
                    cb(err)
                }
                keygen.gencert((err) => {
                    if (err) {
                        cb(err)
                    }
                    keygen.exportcert((err) => {
                        if (err) {
                            cb(err)
                        }
                        keygen.importcert({
                            keystore: `${opt.cn}.jks`,
                            password: opt.password,
                            file: 'temp.crt',
                            alias: 'mykey'
                        }, (err) => {
                            if (err) {
                                cb(err)
                            }
                            keygen.importcert({
                                keystore: `${opt.cn}.jks`,
                                password: opt.password,
                                file: 'CA.crt',
                                alias: 'cacert'
                            }, (err) => {
                                if (err) {
                                    cb(err)
                                }
                                fs.readFile(`temp/${opt.cn}.jks`, (err, contents) => {
                                    cb(err, contents)
                                })
                            })
                        })
                    })
                })
            })
        })
    },

    genkeypair: (opt, cb) => {
        exec(`keytool -genkeypair \
        -alias mykey \
        -keyalg RSA \
        -keysize 2048 \
        -dname "cn=${opt.cn}, ou=${opt.ou}, o=${opt.o}" \
        -validity 365 \
        -keypass ${opt.password} \
        -storepass ${opt.password} \
        -keystore temp/${opt.cn}.jks`, (error, stdout, stderr) => {
                console.log(stderr)
                cb(error)
            })
    },
    certreq: (opt, cb) => {
        exec(`keytool -certreq \
        -alias mykey \
        -file temp/temp.csr \
        -keypass ${opt.password} \
        -storepass  ${opt.password}\
        -keystore temp/${opt.keystore}`, (error, stdout, stderr) => {
                console.log(stderr)
                cb(error)
            })
    },
    gencert: (cb) => {
        exec(`keytool -gencert\
        -alias mykey\
        -infile temp/temp.csr\
        -outfile temp/temp.crt\
        -keypass password\
        -storepass password\
        -keystore CA/CA.jks\
        -rfc`, (error, stdout, stderr) => {
                console.log(stderr)
                cb(error)
            })
    },
    exportcert: (cb) => {
        exec(`keytool -exportcert\
        -alias mykey\
        -file temp/CA.crt\
        -storepass password\
        -keystore CA/CA.jks\
        -rfc`, (error, stdout, stderr) => {
                console.log(stderr)
                cb(error)
            })
    },
    importcert: (opt, cb) => {
        exec(`
        "keytool -importcert\
        -noprompt -trustcacerts\
        -alias temp/${opt.alias}\
        -file temp/${opt.file}\
        -keypass ${opt.password}\
        -storepass ${opt.password}\
        -keystore temp/${opt.keystore}`, (error, stdout, stderr) => {
                console.log(stderr)
                cb(error)
            })
    }

}



module.exports = keygen