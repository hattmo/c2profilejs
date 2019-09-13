
import React from "react";
import { Option } from "../../../interfaces/profile";

interface IProps {
    transform: Option[];
    termination?: Option;
    onTransformChanged: (newTransform: Option[]) => void;
    onTerminationChanged: () => void;
}

export default ({ transform, termination, onTransformChanged, onTerminationChanged }: IProps) => {
    console.log(transform);
    return (
        <div>
            {
                transform.map((item, index) => {
                    return (<div key={index}>
                        {`${index + 1} ${item.key} ${item.value} `}
                        <span onClick={() => {
                            onTransformChanged(transform.filter((_item, i) => index !== i));
                        }}>X</span>
                    </div>)
                })
            }{
                termination ? <div key={0}>
                    {`Term: ${termination.key} ${termination.value} `} <span onClick={() => {
                        onTerminationChanged();
                    }}>X</span>
                </div> : null
            }
        </div >
    )
}

/**
 * ,

 */
