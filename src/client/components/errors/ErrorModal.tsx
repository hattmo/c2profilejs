import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  onLeave: () => void;
}

export default ({ onLeave, children }: IProps) => {
  return (
    <div style={mainStyle} onClick={() => onLeave()}>
      <div style={modalStyle} onClick={(e) => {
        e.stopPropagation();
      }}>
        <p style={{ margin: "0px", fontSize: "40pt" }}>Error</p>
        <p style={{ margin: "0px", fontSize: "25pt" }}>{children}</p>
        <button style={{ width: "60px" }} onClick={() => onLeave()}>OK</button>
      </div>
    </div>
  );
};

const mainStyle: React.CSSProperties = {
  position: "absolute",
  top: "0px",
  right: "0px",
  display: "grid",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  placeContent: "center",
  width: "100vw",
  height: "100vh",
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "white",
  border: "3px solid black",
  borderRadius: "5px",
  padding: "4px",
  gap: "4px",
  display: "grid",
  placeItems: "center center",
  width: "500px",
};
