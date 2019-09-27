import React from "react";
import IProfile from "../../../interfaces/profile";
import CollapsablePanel from "../formElements/panels/CollapsablePanel";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    profiles: IProfile[];
}

export default ({ profiles, ...rest }: IProps) => {
    return (
        <div {...rest}>
            {profiles.map((val) => {
                return (
                    <CollapsablePanel title={val.name} key={val.name} >
                        <a href={`/api/profiles/${val.name}?download=true`}>download</a>
                    </CollapsablePanel>
                );
            })}
        </div>
    );
};
