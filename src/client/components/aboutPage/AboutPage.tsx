import React from "react";

export default (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1 {...props}>About Me</h1>
    );
};
