export default interface FormInf {
    sections: Section[];
}

export interface Section {
    title: string;
    type: SectionTypes;
    fields?: Array<FieldSelectText | FieldText | FieldPairText | FieldSignKeystore | FieldMutation>;
    sections?: Section[];
}

export interface Field {
    type: InputTypes;
    path: string;
}

export interface FieldSelectText extends Field {
    options: OptionSelectText[];
}

export interface OptionSelectText {
    text: string;
    format: RegExp;
    hasInput: boolean;
}

export interface FieldText extends Field {
    label: string;
    format: RegExp;
}

export interface FieldPairText extends Field {
    label: string;
    formatKey: RegExp;
    formatValue: RegExp;
}

export interface FieldSignKeystore extends Field {
    label: string;
}

export interface FieldMutation extends Field {
    transformOptions: OptionSelectText[];
    terminationOptions: OptionSelectText[];
}

export enum SectionTypes {
    collapsable,
    box,
    split,
}

export enum InputTypes {
    FieldSelectText,
    FieldText,
    FieldPairText,
    FieldSignKeystore,
    FieldMutation,
}
