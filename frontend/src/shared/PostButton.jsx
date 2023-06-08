import React from 'react';


export const PostButton = ({ title, color, onClick }) => {
    return (
        <button onClick={onClick} className={`leading-10 ml-2 text-center w-24 bg-${color}-500 text-white rounded-md shadow-md font-semibold transition hover:bg-${color}-700`}>
            {title}
        </button>
    )
}
