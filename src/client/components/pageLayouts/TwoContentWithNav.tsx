import React from "react";
import SideBar from "../sidebar/SideBar";
import NavBar from "../navbar/NavBar";

interface IProps {
  small: boolean;
  mainContent: React.ReactNode;
  altContent: React.ReactNode;
  navLinks: React.ReactNode[];

}
export default ({ small, mainContent, altContent, navLinks }: IProps) => {
  return (
    <div>
      {small ?
        <SideBar navLinks={navLinks} content={altContent} /> :
        <NavBar navLinks={navLinks} />
      }
      {small ?
        <div style={smallStyle}>
          {mainContent}
        </div> :
        <div style={largeStyle}>
          {mainContent}
          {altContent}
        </div>
      }
    </div>
  );
};

const largeStyle = {
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
  marginTop: "75px",
  padding: "4px",
  gap: "4px",
};

const smallStyle = {
  marginRight: "60px",
  padding: "4px",
};
