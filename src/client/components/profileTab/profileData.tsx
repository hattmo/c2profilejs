import React from "react";
interface IProps {
    title: string;
}

export default function({ title }: IProps) {
    return (
        <div>
            <a href={`/profiles/${title}?download=true`}>download</a>
        </div>
    );
}
