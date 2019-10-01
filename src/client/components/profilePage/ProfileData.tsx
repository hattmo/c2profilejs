import React from "react";
import IProfile from "../../../interfaces/profile";
import CollapsablePanel from "../formElements/panels/CollapsablePanel";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    profiles: IProfile[];
}

export default ({ profiles, style, ...rest }: IProps) => {
    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            {profiles.map((val) => {
                return (
                    <CollapsablePanel style={{ backgroundColor: "white"}} title={val.name} key={val.name} >
                        <a href={`${window.APP_ROOT}/api/profiles/${val.name}?download=true`}>download</a>
                    </CollapsablePanel>
                );
            })}
        </div>
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    gap: "4px",
    gridAutoRows: "min-content",
};
