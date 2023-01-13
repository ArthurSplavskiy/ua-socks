import {FC} from "react";
import "./Loading.scss";

interface iLoadingProps {
  className?: string;
  type?: "inBlock";
  bgColor?: "light" | "dark" | "transparent";
  size?: "lg";
  customSize?: number; // px, rem, em...
}

export const Loading: FC<iLoadingProps> = ({
  className = "",
  type = "",
  bgColor = "light",
  size = "md",
  customSize
}) => {
  return (
    <div
      className={`Loading ${bgColor} ${type} ${className} ${size}`}
      style={{fontSize: `${customSize}rem`}}
    >
      <div className="Loading-block">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
