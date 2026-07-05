import React from 'react';

const ActionButton = ({ onClick, label, icon }) => {
    return (
        <button 
            onClick={onClick} 
            className="border-2 border-gray-700 text-gray-700 bg-white rounded px-4 py-1 text-sm font-bold flex items-center hover:bg-gray-100 transition-colors"
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
};

export default ActionButton;
