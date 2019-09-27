import React from "react";
import IFormInf, {
    IFieldMutation,
    IFieldPairText,
    IFieldSelectText,
    IFieldSignKeystore,
    IFieldText,
    InputTypes,
    ISection,
} from "../../../interfaces/formInterfaces";
import CollapsablePanel from "./panels/CollapsablePanel";
import InputMutation from "./inputs/InputMutation";
import InputPairText from "./inputs/InputPairText";
import InputSelectText from "./inputs/InputSelectText";
import InputSignKeystore from "./inputs/InputSignKeystore";
import InputText from "./inputs/InputText";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    formDef: IFormInf;
    currentData: object;
    handleData: (path: string, data: any) => void;
}

export default ({ formDef, currentData, handleData, style, ...rest }: IProps) => {
    const buildTextField = (field: IFieldText) => {
        return (
            <InputText key={field.path} onChanged={handleData} path={field.path}
                label={field.label} format={field.format} text={currentData[field.path]} />
        );
    };
    const buildSelectTextField = (field: IFieldSelectText) => {
        return (
            <InputSelectText key={field.path} onChanged={handleData} path={field.path}
                options={field.options} selectedOptions={currentData[field.path]} />
        );
    };

    const buildSignKeystoreField = (field: IFieldSignKeystore) => {
        return (
            <InputSignKeystore key={field.path} onChanged={handleData} path={field.path}
                label={field.label} keystoreNames={field.options} selectedVal={currentData[field.path]} />
        );
    };

    const buildPairTextField = (field: IFieldPairText) => {
        return (
            <InputPairText key={field.path} onChanged={handleData} path={field.path}
                label={field.label} formatKey={field.formatKey} formatValue={field.formatValue}
                selectedOptions={currentData[field.path]} />
        );
    };
    const buildMutationField = (field: IFieldMutation) => {
        return (
            <InputMutation key={field.path} onChanged={handleData} path={field.path}
                transformOptions={field.transformOptions} terminationOptions={field.terminationOptions} />
        );
    };
    const buildFieldsInSection = (section: ISection) => {
        if (section.fields !== undefined) {
            return (
                section.fields && section.fields.map((field) => {
                    switch (field.type) {
                        case InputTypes.FieldText:
                            return buildTextField(field as IFieldText);
                        case InputTypes.FieldSelectText:
                            return buildSelectTextField(field as IFieldSelectText);
                        case InputTypes.FieldSignKeystore:
                            return buildSignKeystoreField(field as IFieldSignKeystore);
                        case InputTypes.FieldPairText:
                            return buildPairTextField(field as IFieldPairText);
                        case InputTypes.FieldMutation:
                            return buildMutationField(field as IFieldMutation);
                        default:
                            throw new Error();
                    }
                })
            );
        } else {
            return null;
        }
    };

    const buildSection = (section: ISection) => {
        return (
            <CollapsablePanel key={section.title} title={section.title}>
                {buildFieldsInSection(section)}
                {section.sections && section.sections.map(buildSection)}
            </CollapsablePanel>
        );
    };

    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            {formDef.sections.map((section) => buildSection(section))}
        </div>
    );
};
const mainStyle: React.CSSProperties = {
    display: "grid",
    justifyItems: "fill",
    alignItems: "center",
    gap: "4px 4px",
};
