import React from "react";

function InputField({ type, placeholder, name, value,onChange}) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full text-2xl px-4 py-4 border mt-4 border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        />
    );
}

export default InputField;