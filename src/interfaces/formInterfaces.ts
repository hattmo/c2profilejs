export default interface IFormInf {
    sections: ISection[];
}

export interface ISection {
    title: string;
    type: SectionTypes;
    fields?: Array<IFieldSelectText | IFieldText | IFieldPairText | IFieldSignKeystore | IFieldMutation>;
    sections?: ISection[];
}

export interface IField {
    type: InputTypes;
    path: string;
}

export interface IFieldSelectText extends IField {
    options: IOptionSelectText[];
}

export interface IOptionSelectText {
    text: string;
    format: RegExp;
    hasInput: boolean;
}

export interface IFieldText extends IField {
    label: string;
    format: RegExp;
}

export interface IFieldPairText extends IField {
    label: string;
    formatKey: RegExp;
    formatValue: RegExp;
}

export interface IFieldSignKeystore extends IField {
    label: string;
    options: string[];
}

export interface IFieldMutation extends IField {
    transformOptions: IOptionSelectText[];
    terminationOptions: IOptionSelectText[];
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
