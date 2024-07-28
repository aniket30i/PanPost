import React from "react";

const Input = ({
  maxLength,
  name,
  id,
  type,
  fieldName,
  required,
  pattern,
  onChange = () => {}, // on operation
  value = "",
}) => {
  return (
    <div>
      <div className="flex flex-col w-full">
        <p className="text-sm mx-2 mb-1">{fieldName}</p>
        <input
          type={type}
          id={id}
          name={name}
          maxLength={maxLength}
          {...(required && { required })}
          {...(pattern && { pattern })}
          onChange={onChange}
          className="rounded-xl p-1 px-4 w-4/5 border-2 border-zinc-300 self-start "
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;
