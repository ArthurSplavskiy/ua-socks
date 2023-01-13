import React, {Ref} from "react";

export default interface iSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string | number;
  options: iSelectOption[];
  label?: string;
  ariaLabel?: string;
  err?: boolean;
  errMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  defaultItem?: {value: number | string; label: string};
  ref?: Ref<HTMLSelectElement> | undefined;
}

export interface iSelectOption {
  value: any;
  label: string | number;
}
