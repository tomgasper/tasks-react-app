import React from 'react';

const AddBtn = ({
    onClick,
    color,
    rot1
}) => {

    return (
        <div onClick={onClick} >
        <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none">
        <g id="Add-Icon-Copy" transform="translate(2.000000, 1.000000)">
            <g id="Group">
                <g id="Oval" className='navbar-button-circle' >
                    <circle cx="28" cy="28" r="28" fill="black" fillOpacity="1" filter="url(#filter-2)"></circle>
                    <circle className='navbar-button-circle' cx="28" cy="28" r="28" fill={color}></circle>
                </g>
                <text className='navbar-button-circle' transform={`rotate(${rot1}, 28,28)`} id="+" fontFamily="GujaratiSangamMN-Bold, Gujarati Sangam MN" fontSize="32" fontWeight="bold" letterSpacing="1.472" fill="#FFFFFF">
                    <tspan x="15.4608788" y="40">+</tspan>
                </text>
            </g>
        </g>
    </g>
    </svg>
    </div>
)
}

export default AddBtn
