import IFormInf, { InputTypes, IOptionSelectText, SectionTypes } from "../../interfaces/formInterfaces";

const globalOptions: IOptionSelectText[] = [
    {
        text: "dns_idle",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "dns_max_txt",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "dns_sleep",
        format: /^[0-9]*$/,
        hasInput: true,
    },
    {
        text: "dns_stager_prepend",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "dns_stager_subhost",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "dns_ttl",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "host_stage",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "jitter",
        format: /^[0-9]*$/,
        hasInput: true,
    },
    {
        text: "maxdns",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "pipename",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "pipename_stager",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "sleeptime",
        format: /^[0-9]*$/,
        hasInput: true,
    },
    {
        text: "spawnto_x86",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "spawnto_x64",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "useragent",
        format: /^.*$/,
        hasInput: true,
    },
];
const transformOptions: IOptionSelectText[] = [
    {
        text: "append",
        format: /^.*$/,
        hasInput: true,
    }, {
        text: "prepend",
        format: /^.*$/,
        hasInput: true,
    }, {
        text: "base64",
        format: /^$/,
        hasInput: false,
    }, {
        text: "base64url",
        format: /^$/,
        hasInput: false,
    }, {
        text: "mask",
        format: /^$/,
        hasInput: false,
    }, {
        text: "netbios",
        format: /^$/,
        hasInput: false,
    }, {
        text: "netbiosu",
        format: /^$/,
        hasInput: false,
    },
];
const terminationOptions: IOptionSelectText[] = [
    {
        text: "",
        format: /^$/,
        hasInput: false,
    }, {
        text: "header",
        format: /^.*$/,
        hasInput: true,
    }, {
        text: "parameter",
        format: /^.*$/,
        hasInput: true,
    }, {
        text: "print",
        format: /^$/,
        hasInput: false,
    }, {
        text: "uri-append",
        format: /^$/,
        hasInput: false,
    },
];

export default (): IFormInf => {
    return ({
        sections: [
            {
                title: "Global Options",
                type: SectionTypes.collapsable,
                fields: [
                    {
                        type: InputTypes.FieldText,
                        path: "name",
                        label: "Name",
                        format: /^\w*$/,
                    },
                    {
                        type: InputTypes.FieldSelectText,
                        path: "globaloptions",
                        options: globalOptions,
                    },
                ],
            }, {
                title: "HTTP-Get",
                type: SectionTypes.collapsable,
                fields: [
                    {
                        type: InputTypes.FieldText,
                        path: "httpget.uri",
                        label: "URI",
                        format: /^(\w|\/)*$/,
                    },
                    {
                        type: InputTypes.FieldText,
                        path: "httpget.verb",
                        label: "Verb",
                        format: /^.*$/,
                    },
                ],
                sections: [
                    {
                        title: "Client",
                        type: SectionTypes.collapsable,
                        fields: [
                            {
                                type: InputTypes.FieldPairText,
                                path: "httpget.client.header",
                                label: "Headers",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                            {
                                type: InputTypes.FieldPairText,
                                path: "httpget.client.paramer",
                                label: "Parameters",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                        ],
                        sections: [
                            {
                                title: "Metadata",
                                type: SectionTypes.collapsable,
                                fields: [
                                    {
                                        type: InputTypes.FieldMutation,
                                        path: "httpget.client.metadata",
                                        transformOptions,
                                        terminationOptions,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        title: "Server",
                        type: SectionTypes.collapsable,
                        fields: [
                            {
                                type: InputTypes.FieldPairText,
                                path: "httpget.server.header",
                                label: "Headers",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                            {
                                type: InputTypes.FieldPairText,
                                path: "httpget.server.paramer",
                                label: "Parameters",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                        ],
                        sections: [
                            {
                                title: "Output",
                                type: SectionTypes.collapsable,
                                fields: [
                                    {
                                        type: InputTypes.FieldMutation,
                                        path: "httpget.server.output",
                                        transformOptions,
                                        terminationOptions,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }, {
                title: "HTTP-Post",
                type: SectionTypes.collapsable,
                fields: [
                    {
                        type: InputTypes.FieldText,
                        path: "httppost.uri",
                        label: "URI",
                        format: /.*/,
                    },
                    {
                        type: InputTypes.FieldText,
                        path: "httppost.verb",
                        label: "Verb",
                        format: /.*/,
                    },
                ],
                sections: [
                    {
                        title: "Client",
                        type: SectionTypes.collapsable,
                        fields: [
                            {
                                type: InputTypes.FieldPairText,
                                path: "httppost.client.header",
                                label: "Headers",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                            {
                                type: InputTypes.FieldPairText,
                                path: "httppost.client.paramer",
                                label: "Parameters",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                        ],
                        sections: [
                            {
                                title: "ID",
                                type: SectionTypes.collapsable,
                                fields: [
                                    {
                                        type: InputTypes.FieldMutation,
                                        path: "httppost.client.id",
                                        transformOptions,
                                        terminationOptions,
                                    },
                                ],
                            },
                            {
                                title: "Output",
                                type: SectionTypes.collapsable,
                                fields: [
                                    {
                                        type: InputTypes.FieldMutation,
                                        path: "httppost.client.output",
                                        transformOptions,
                                        terminationOptions,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        title: "Server",
                        type: SectionTypes.collapsable,
                        fields: [
                            {
                                type: InputTypes.FieldPairText,
                                path: "httppost.server.header",
                                label: "Headers",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                            {
                                type: InputTypes.FieldPairText,
                                path: "httppost.server.paramer",
                                label: "Parameters",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                        ],
                        sections: [
                            {
                                title: "Output",
                                type: SectionTypes.collapsable,
                                fields: [
                                    {
                                        type: InputTypes.FieldMutation,
                                        path: "httppost.server.output",
                                        transformOptions,
                                        terminationOptions,
                                    },
                                ],
                            },
                        ],
                    },

                ],
            }, {
                title: "HTTP-Stager",
                type: SectionTypes.collapsable,
                fields: [
                    {
                        type: InputTypes.FieldText,
                        path: "httpstager.uri_x86",
                        label: "URI x86",
                        format: /.*/,
                    }, {
                        type: InputTypes.FieldText,
                        path: "httpstager.uri_x64",
                        label: "URI x64",
                        format: /.*/,
                    },
                ],
                sections: [
                    {
                        title: "Server",
                        type: SectionTypes.collapsable,
                        fields: [
                            {
                                type: InputTypes.FieldPairText,
                                path: "httpstager.server.header",
                                label: "Headers",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                            {
                                type: InputTypes.FieldPairText,
                                path: "httpstager.server.paramer",
                                label: "Parameters",
                                formatKey: /.*/,
                                formatValue: /.*/,
                            },
                        ],
                        sections: [
                            {
                                title: "Output",
                                type: SectionTypes.collapsable,
                                fields: [
                                    {
                                        type: InputTypes.FieldMutation,
                                        path: "httpstager.server.output",
                                        transformOptions,
                                        terminationOptions,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    });
};
