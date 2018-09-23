const { exec } = require('child_process')
const fsp = require('fs').promises
const fs = require('fs')
const uuid = require('uuid/v4')

let keygen = {

    checkDirs: () => {
        return new Promise((resolve, reject) => {
            dirsToCreate = [keygen.createDir('./temp'), keygen.createDir('./cas'), keygen.createDir('./keystores')]
            Promise.all(dirsToCreate).then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })
    },

    createDir: (dir) => {
        return new Promise((resolve, reject) => {
            fs.exists(dir, (exists) => {
                if (!exists) {
                    fsp.mkdir(dir).then(() => {
                        resolve()
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    resolve()
                }
            })
        })
    },

    //      opt = {
    //         cn:
    //         ou:
    //         o:
    //         password:
    //     }
    generateKeyStore: (opt) => new Promise((resolve, reject) => {
        var uniquepath = uuid()
        fsp.mkdir(`temp/${uniquepath}`).then(() => {
            return keygen.genkeypair({
                cn: opt.cn,
                ou: opt.ou,
                o: opt.o,
                password: opt.password,
                uniquepath: uniquepath
            })
        }).then(() => {
            return keygen.certreq({
                keystore: `${opt.cn}.jks`,
                password: opt.password,
                uniquepath: uniquepath
            })
        }).then(() => {
            return keygen.gencert({
                uniquepath: uniquepath
            })
        }).then(() => {
            return keygen.exportcert({
                uniquepath: uniquepath
            })
        }).then(() => {
            return keygen.importcert({
                keystore: `${opt.cn}.jks`,
                password: opt.password,
                file: 'CA.crt',
                alias: 'cacert',
                uniquepath: uniquepath
            })
        }).then(() => {
            return keygen.importcert({
                keystore: `${opt.cn}.jks`,
                password: opt.password,
                file: 'temp.crt',
                alias: 'mykey',
                uniquepath: uniquepath
            })
        }).then(() => {
            return fsp.copyFile(`temp/${uniquepath}/${opt.cn}.jks`, `keystores/${opt.cn}.jks`)
        }).then(()=>{
            resolve()
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            fsp.readdir(`temp/${uniquepath}`).then((files) => {
                filePromises = []
                files.forEach(file => {
                    filePromises.push(fsp.unlink(`temp/${uniquepath}/${file}`))
                });
                return Promise.all(filePromises)
            }).then(() => {
                return fsp.rmdir(`temp/${uniquepath}`)
            }).catch((err)=>{
                console.error('Failed to delete files')
            })
        })
    }),


    genkeypair: (opt) => new Promise((resolve, reject) => {
        console.log(opt)
        exec(`keytool -genkeypair \
        -alias mykey \
        -keyalg RSA \
        -keysize 2048 \
        -dname "cn=${opt.cn}, ou=${opt.ou}, o=${opt.o}" \
        -validity 365 \
        -keypass ${opt.password} \
        -storepass ${opt.password} \
        -keystore temp/${opt.uniquepath}/${opt.cn}.jks`, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
    }),
    certreq: (opt) => new Promise((resolve, reject) => {
        exec(`keytool -certreq \
        -alias mykey \
        -file temp/${opt.uniquepath}/temp.csr \
        -keypass ${opt.password} \
        -storepass  ${opt.password}\
        -keystore temp/${opt.uniquepath}/${opt.keystore}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
    }),
    gencert: (opt) => new Promise((resolve, reject) => {
        exec(`keytool -gencert\
        -alias mykey\
        -infile temp/${opt.uniquepath}/temp.csr\
        -outfile temp/${opt.uniquepath}/temp.crt\
        -keypass password\
        -storepass password\
        -keystore cas/CA.jks\
        -rfc`, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
    }),
    exportcert: (opt) => new Promise((resolve, reject) => {
        exec(`keytool -exportcert\
        -alias mykey\
        -file temp/${opt.uniquepath}/CA.crt\
        -storepass password\
        -keystore cas/CA.jks\
        -rfc`, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
    }),
    importcert: (opt) => new Promise((resolve, reject) => {
        exec(`keytool -importcert\
        -noprompt -trustcacerts\
        -alias ${opt.alias}\
        -file temp/${opt.uniquepath}/${opt.file}\
        -keypass ${opt.password}\
        -storepass ${opt.password}\
        -keystore temp/${opt.uniquepath}/${opt.keystore}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
    }),
}



module.exports = keygen