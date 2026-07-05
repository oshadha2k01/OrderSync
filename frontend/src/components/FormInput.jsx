import React from 'react';

const FormInput = ({ label, type = "text", value, onChange, placeholder = "" }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <label className="w-full sm:w-32 text-sm font-semibold text-gray-700">
                {label}
            </label>
            <input 
                type={type} 
                className="border border-gray-400 flex-1 p-1 rounded focus:outline-none focus:border-blue-500 text-sm"
                value={value || ''} 
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FormInput;
