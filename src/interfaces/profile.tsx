export interface Option {
    key: string
    value: string
}

export interface Mutation{
    transform?: string[],
    termination: string
}

export default interface ProfileInf {
    name: string
    globaloptions?: Option[]
    httpget?: {
        uri?: string
        verb?: string
        client?: {
            header?: Option[]
            parameter?: Option[]
            metadata?: Mutation
        }
        server?: {
            header?: Option[]
            parameter?: Option[]
            output?: Mutation
        }
    }
    httppost?: {
        uri?: string
        verb?: string
        client?: {
            header?: Option[]
            parameter?: Option[]
            id?: Mutation
            out?: Mutation
        }
        server?: {
            header?: Option[]
            parameter?: Option[]
            output?: Mutation
        }
    }
    httpstager?: {
        uri_x86?: string
        uri_x64?: string
        server?: {
            header?: Option[]
            parameter?: Option[]
            output?: Mutation
        }
    }
}