import React from "react";
const FormInput = ({
  labelText,
  value,
  name,
  type,
  placeholder,
  handleChange,
  disabled,
  min,
  max,
  className,
}) => {
  return (
    <div className={`form-row text-black ${className}`}>
      <label htmlFor="" className="form-label">
        {labelText ? labelText : name}
      </label>
      <input
        onChange={handleChange}
        type={type}
        className="form-input "
        name={name}
        value={value}
        placeholder={placeholder && placeholder}
        disabled={disabled}
        min={min}
        max={max}
        // valueAsNumber={true}
      />
    </div>
  );
};
export default FormInput;
