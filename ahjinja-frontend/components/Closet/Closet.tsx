import React from "react";
import "./closet.css";

interface Props {
  className: any;
}

export const Closet = ({ className }: Props): JSX.Element => {
  return <div className={`closet ${className}`} />;
};
