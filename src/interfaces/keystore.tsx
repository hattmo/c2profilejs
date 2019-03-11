export interface Option {
    key: string
    value: string
}

export default interface Keystore {
    keystore: {
        alias: string,
        password: string,
        id: string
    }
    opt: {
        dname: Option[]
    }
    ca?: string
}