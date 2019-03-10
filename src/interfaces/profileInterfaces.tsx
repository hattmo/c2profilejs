export default interface ProfileFormDesc {
    sections: Section[]
}

export interface Section {
    title: string,
    fields: (SelectTextField)[]
}


export interface Field {
    type: string
}

export interface SelectTextField extends Field {
    options: SelectTextOption[],
    path: string

}

export interface SelectTextOption {
    text: string,
    format: RegExp
}