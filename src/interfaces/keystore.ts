export interface IOption {
    key: string;
    value: string;
}

export default interface IKeystore {
    keystore: {
        alias: string,
        password: string,
        id: string,
    };
    opt: {
        dname: IOption[],
    };
    ca?: string;
}
