export interface Option {
    key: string
    value: string
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
            metadata?: {
                transform?: string[]
                termination?: string
            }
        }
        server?: {
            header?: Option[]
            parameter?: Option[]
            output?: {
                transform?: string[]
                termination?: string
            }
        }
    }
    httppost?: {
        uri?: string
        verb?: string
        client?: {
            header?: Option[]
            parameter?: Option[]
            id?: {
                transform?: string[]
                termination?: string
            }
            out?: {
                transform?: string[]
                termination?: string
            }
        }
        server?: {
            header?: Option[]
            parameter?: Option[]
            output?: {
                transform?: string[]
                termination?: string
            }
        }
    }
    httpstager?: {
        uri_x86?: string
        uri_x64?: string
        server?: {
            header?: Option[]
            parameter?: Option[]
            output?: {
                transform?: string[]
                termination?: string
            }
        }
    }
}