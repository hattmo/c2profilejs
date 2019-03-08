export default interface Keystore {
    keystore: {
        alias: string,
        password: string,
        id: string
    }
    opt: {
        dname: string
    }
    ca?: string
}