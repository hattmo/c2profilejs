import React from "react";
import FormInf, { FieldText, FieldSelectText, FieldSignKeystore, Section, InputTypes, FieldPairText, FieldMutation } from "../../../interfaces/formInterfaces";
import InputText from "./InputText";
import InputSelectText from "./InputSelectText";
import InputSignKeystore from "./InputSignKeystore";
import InputPairText from "./InputPairText";
import InputMutation from "./InputMutation";
import CollapsablePanel from "./CollapsablePanel";

interface IProp {
    formDef: FormInf;
    currentData: any;
    handleData: (path: string, data: any) => void
}

export default ({ formDef, currentData, handleData }: IProp) => {
    const buildTextField = (field: FieldText) => {
        return (
            <InputText key={field.path} onChanged={handleData} path={field.path} label={field.label} format={field.format} text={currentData[field.path]} ></InputText>
        );
    }
    const buildSelectTextField = (field: FieldSelectText) => {
        return (
            <InputSelectText key={field.path} onChanged={handleData} path={field.path} options={field.options} selectedOptions={currentData[field.path]} ></InputSelectText>
        );
    }

    const buildSignKeystoreField = (field: FieldSignKeystore) => {
        return (
            <InputSignKeystore key={field.path} onChanged={handleData} path={field.path} label={field.label} keystoreNames={field.options} selectedVal={currentData[field.path]} ></InputSignKeystore>
        );
    }

    const buildPairTextField = (field: FieldPairText) => {
        return (
            <InputPairText key={field.path} onChanged={handleData} path={field.path} label={field.label} formatKey={field.formatKey} formatValue={field.formatValue} selectedOptions={currentData[field.path]} />
        );
    }
    const buildMutationField = (field: FieldMutation) => {
        return (
            <InputMutation key={field.path} onChanged={handleData} path={field.path} transformOptions={field.transformOptions} terminationOptions={field.terminationOptions} />
        );
    }
    const buildFieldsInSection = (section: Section) => {
        if (section.fields !== undefined) {
            return (
                section.fields.map((field) => {
                    switch (field.type) {
                        case InputTypes.FieldText:
                            return buildTextField(field as FieldText);
                        case InputTypes.FieldSelectText:
                            return buildSelectTextField(field as FieldSelectText);
                        case InputTypes.FieldSignKeystore:
                            return buildSignKeystoreField(field as FieldSignKeystore);
                        case InputTypes.FieldPairText:
                            return buildPairTextField(field as FieldPairText);
                        case InputTypes.FieldMutation:
                            return buildMutationField(field as FieldMutation);
                        default:
                            throw new Error();
                    }
                })
            );
        } else {
            return [];
        }
    }

    const buildSection = (section: Section) => {
        return (
            <div>
                <CollapsablePanel title={section.title}>
                    {buildFieldsInSection(section)}
                    {section.sections && section.sections.map(buildSection)}
                </CollapsablePanel>
            </div>
        );
    }

    return (
        <div>
            {formDef.sections.map((section) => buildSection(section))}
        </div>
    )
}