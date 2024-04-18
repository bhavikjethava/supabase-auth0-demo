import React, { FC } from "react";

interface AppInputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  [Key: string]: unknown;
  onChange?: (value: any) => void;
}

const AppInputField: FC<AppInputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
  ...rest
}) => {
  const onChangeHandler = (e: any) => {
    onChange?.(e.target.value);
  };
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        {...rest}
      />
      <p className="text-red-500 text-xs italic">{error}</p>
    </div>
  );
};

export default AppInputField;
