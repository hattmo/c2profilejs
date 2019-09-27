import React from "react";

export default (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1 {...props}>404 Not Found</h1>
    );
};
