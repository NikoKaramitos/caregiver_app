import React from "react";

function Card({ children, className }) {
    return (
        <div className={`bg-gray-200 shadow-xl rounded-3xl border border-gray-300 p-10 ${className}`}>
            { children }
        </div>
    );
}

export default Card;