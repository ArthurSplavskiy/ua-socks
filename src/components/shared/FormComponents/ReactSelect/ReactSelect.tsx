import {FC} from "react";
import Select, {GroupBase, Props} from "react-select";
import "./ReactSelect.scss";

export type tReactSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

interface iReactSelectProps extends tReactSelectProps<any, any> {
  hideArrow?: boolean;
  className?: string;
}

export const ReactSelect: FC<iReactSelectProps> = ({
  hideArrow = true,
  className = "",
  ...props
}) => {
  const isHiddenArrow = hideArrow ? "hidden-arrow" : "";

  return (
    <Select
      className={`ReactSelect ${isHiddenArrow} ${className}`}
      classNamePrefix="ReactSelect-select"
      {...props}
    />
  );
};
