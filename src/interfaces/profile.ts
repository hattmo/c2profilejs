export interface IOption {
    key: string;
    value: string;
}

export interface IMutation {
    transform?: IOption[];
    termination: IOption;
}

export default interface IProfile {
    name: string;
    globaloptions?: IOption[];
    httpget?: {
        uri?: string
        verb?: string
        client?: {
            header?: IOption[]
            parameter?: IOption[]
            metadata?: IMutation,
        }
        server?: {
            header?: IOption[]
            parameter?: IOption[]
            output?: IMutation,
        },
    };
    httppost?: {
        uri?: string
        verb?: string
        client?: {
            header?: IOption[]
            parameter?: IOption[]
            id?: IMutation
            out?: IMutation,
        }
        server?: {
            header?: IOption[]
            parameter?: IOption[]
            output?: IMutation,
        },
    };
    httpstager?: {
        uri_x86?: string
        uri_x64?: string
        server?: {
            header?: IOption[]
            parameter?: IOption[]
            output?: IMutation,
        },
    };
}
