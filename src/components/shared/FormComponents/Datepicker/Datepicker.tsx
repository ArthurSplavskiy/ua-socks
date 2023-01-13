import {FC, forwardRef} from "react";
import DatePicker, {ReactDatePickerProps} from "react-datepicker";
import moment from "moment";
import {Icon} from "components/Icon/Icon";

import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.scss";

interface iDatepickerProps extends Partial<Omit<ReactDatePickerProps, "value" | "onChange">> {
  onChange: (date: string) => void;
  value: string;
  label?: string;
  className?: string;
  errors?: string[];
  dateFormat?: string;
  withIcon?: boolean;
}

export const Datepicker: FC<iDatepickerProps> = ({
  dateFormat = "MM/DD/yyyy",
  errors = [],
  className = "",
  label = "",
  withIcon,
  value,
  onChange,
  ...props
}) => {
  if (!onChange) return null;

  const isError = !!errors.length ? "error" : "";
  const InputWithIcon = forwardRef((props: any, ref: any) => (
    <div ref={ref} className="Datepicker-inputWrap wrap" onClick={props.onClick}>
      {withIcon && <Icon icon="calendar" color="dark-gray" />}
      <input type="text" {...props} readOnly />
    </div>
  ));

  const handleChange = (date: Date | null) => onChange(date ? date.toString() : "");

  return (
    <div className={`Datepicker ${className} ${withIcon ? "withIcon" : ""}`}>
      {label && <span className={`Datepicker-label label ${isError}`}>{label}</span>}

      <DatePicker
        {...props}
        value={value ? moment(value).format(dateFormat) : value}
        className={`Datepicker-input input ${isError}`}
        onChange={date => handleChange(date)}
        maxDate={new Date("02-29-2099")}
        customInput={<InputWithIcon />}
        selected={moment(value).toDate()}
      />

      {errors.map((error, i) => (
        <span key={i} className="Datepicker-error-message error-message">
          {error}
        </span>
      ))}
    </div>
  );
};
