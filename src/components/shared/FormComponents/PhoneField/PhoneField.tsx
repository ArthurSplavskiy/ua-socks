import React, {ChangeEvent, FC} from "react";
import PhoneInput, {CountryData, PhoneInputProps} from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneField.scss";

interface iPhoneField extends Omit<PhoneInputProps, "onChange"> {
  label?: string;
  errors?: string[];
  className?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>, code: CountryData["dialCode"]) => void;
}

/**
 *
 * @param className
 * @param label
 * @param errors
 * @param props
 * @param props.onChange = (value: string, CountryData: {}, event: ChangeEvent<HTMLInputElement>) => void
 * @constructor
 */
export const PhoneField: FC<iPhoneField> = ({
  className = "",
  label = "",
  onChange,
  errors = [],
  ...props
}) => {
  return (
    <div className={`PhoneField ${!!errors?.length ? "error" : ""} ${className}`}>
      {label && <label className="PhoneField-label label">{label}</label>}
      <PhoneInput
        country="us"
        preferredCountries={["us"]}
        enableAreaCodes={false}
        onChange={(value, countryData: CountryData, event) =>
          onChange(event, countryData?.dialCode)
        }
        {...props}
      />
      {errors.map((error, index) => (
        <span key={index} className="PhoneField-error error">
          {error}
        </span>
      ))}
    </div>
  );
};
