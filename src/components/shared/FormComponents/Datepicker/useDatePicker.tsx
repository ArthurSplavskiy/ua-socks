import {useState} from "react";

type tUseDatePicker = {
  initValue?: string;
  errors?: string[];
  isRequired?: boolean;
  customErrMsg?: string;
};

export const useDatePicker = (props?: tUseDatePicker) => {
  const [value, setValue] = useState(props?.initValue || new Date().toDateString());
  const [err, setErrors] = useState<string[]>(props?.errors || []);

  const onChange = (value: string) => {
    err.length && setErrors([]);
    setValue(value);
  };

  const checkValidity = () => {
    if (props?.isRequired && !value) {
      const errMsg = props?.customErrMsg || "The date field is required";
      setErrors([errMsg]);
      return false;
    }
    return true;
  };

  return {
    value,
    errors: err,
    setErrors,
    checkValidity,
    inputProps: {
      value,
      onChange
    }
  };
};
