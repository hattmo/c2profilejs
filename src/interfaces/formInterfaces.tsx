export default interface FormInf {
    sections: Section[]
}

export interface Section {
    title: string
    type: SectionTypes
    fields?: (FieldSelectText | FieldText | FieldPairText | FieldSignKeystore)[]
    sections?: Section[]
}


export interface Field {
    type: InputTypes
    path: string
}

export interface FieldSelectText extends Field {
    options: OptionSelectText[]
}

export interface OptionSelectText {
    text: string
    format: RegExp
}

export interface FieldText extends Field {
    label: string
    format: RegExp
}

export interface FieldPairText extends Field {
    label: string
    formatKey: RegExp
    formatValue: RegExp
}

export interface FieldSignKeystore extends Field {
    label: string
}

export enum SectionTypes {
    collapsable,
    box,
    split
}

export enum InputTypes {
    FieldSelectText,
    FieldText,
    FieldPairText,
    FieldSignKeystore
}