'use client'
import React from 'react';

function ColorButton({color, isSelected, onClick}) {
    console.log("color ", color)
    return (


        <button

            className={`cursor-pointer  flex items-center justify-center h-8 w-8 rounded-full mx-1 bg-${color} ` }

        />




    );
}

export default ColorButton;