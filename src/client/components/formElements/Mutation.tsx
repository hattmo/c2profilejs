import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
}

export default ({ onClick, children, style, ...rest }: IProps) => {
  return (
    <div style={{ ...mainStyle, ...style }} {...rest}>
      {children}<span onClick={() => onClick()} style={{ cursor: "pointer", float: "right" }}>{" ❌"}</span>
    </div>
  );
};

const mainStyle: React.CSSProperties = {
  backgroundColor: "lightblue",
  padding: "3px",
  borderRadius: "5px",
  borderColor: "black",
  border: "1px",
  borderStyle: "solid",
  boxShadow: "5px 5px 15px -5px black",
};
