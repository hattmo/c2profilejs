import IFormInf, { InputTypes, IOptionSelectText, SectionTypes } from "../../interfaces/formInterfaces";

const dnameOptions: IOptionSelectText[] = [
    {
        text: "CN",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "OU",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "O",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "L",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "S",
        format: /^.*$/,
        hasInput: true,
    },
    {
        text: "C",
        format: /^.*$/,
        hasInput: true,
    },
];

export default (keystores: string[]): IFormInf => {
    return (
        {
            sections: [
                {
                    title: "KeyStore Options",
                    type: SectionTypes.box,
                    fields: [
                        {
                            type: InputTypes.FieldText,
                            path: "keystore.id",
                            label: "Keystore ID",
                            format: /^.*$/,
                        }, {
                            type: InputTypes.FieldText,
                            path: "keystore.alias",
                            label: "Alias",
                            format: /^\w*$/,
                        }, {
                            type: InputTypes.FieldText,
                            path: "keystore.password",
                            label: "Password",
                            format: /^\w{8,}$/,
                        }, {
                            type: InputTypes.FieldSelectText,
                            path: "opt.dname",
                            options: dnameOptions,
                        }, {
                            type: InputTypes.FieldSignKeystore,
                            path: "ca",
                            label: "Keystore",
                            options: keystores,
                        },
                    ],
                },
            ],
        }
    );
};
