import React from 'react';

function Button ({ text, onClick, type = 'button' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className='w-full bg-green-500 text-white text-3xl font-bold py-4 px-4 rounded-lg hover:bg-green-600 focus:outline-none'
        >
            {text}
        </button>
    ); 
}

export default Button;