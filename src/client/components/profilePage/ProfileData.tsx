import React from "react";
import IProfile from "../../../interfaces/profile";
import CollapsablePanel from "../formElements/CollapsablePanel";

interface IProps {
    profiles: IProfile[];
}

export default ({ profiles }: IProps) => {
    return (
        profiles.map((val) => {
            return (
                <CollapsablePanel title={val.name} key={val.name} >
                    <a href={`/profiles/${val.name}?download=true`}>download</a>
                </CollapsablePanel>
            );
        })
    );
};
