import FormInf, { SectionTypes, OptionSelectText, InputTypes } from "../interfaces/formInterfaces";


const dnameOptions: OptionSelectText[] = [
    {
        text: 'CN',
        format: /^.*$/
    },
    {
        text: 'OU',
        format: /^.*$/
    },
    {
        text: 'O',
        format: /^.*$/
    },
    {
        text: 'L',
        format: /^.*$/
    },
    {
        text: 'S',
        format: /^.*$/
    },
    {
        text: 'C',
        format: /^.*$/
    },
]

const defaultKeystoreForm: FormInf = {
    sections: [
        {
            title: 'KeyStore Options',
            type: SectionTypes.box,
            fields: [
                {
                    type: InputTypes.FieldText,
                    path: 'keystore.id',
                    label: 'Keystore ID',
                    format: /^.*$/
                },{
                    type: InputTypes.FieldText,
                    path: 'keystore.alias',
                    label: 'Alias',
                    format: /^\w*$/
                }, {
                    type: InputTypes.FieldText,
                    path: 'keystore.password',
                    label: 'Password',
                    format: /^\w{8,}$/
                }, {
                    type: InputTypes.FieldSelectText,
                    path: 'opt.dname',
                    options: dnameOptions
                }, {
                    type: InputTypes.FieldSignKeystore,
                    path: 'ca',
                    label: 'Keystore'
                }
            ]
        }
    ]

}

export default defaultKeystoreForm