import React from "react";

const Input = ({ maxLength, name, id, type, fieldName }) => {
  return (
    <div>
      <div>
        <p className="text-sm mx-2">{fieldName}</p>
        <input
          type={type}
          id={id}
          name={name}
          maxLength={maxLength}
          className="rounded-xl p-2 px-4 w-2/3 border-2 border-zinc-300 self-start"
        />
      </div>
    </div>
  );
};

export default Input;
