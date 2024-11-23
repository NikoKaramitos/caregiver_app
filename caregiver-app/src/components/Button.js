import React from 'react';

function Button ({ text, onClick, type = 'button' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className='w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none'
        >
            {text}
        </button>
    ); 
}

export default Button;