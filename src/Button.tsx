import React from "react";
import {ButtonProps} from  './ButtonProps'; //importamos la interface desde su propio archivo


const Button: React.FC<ButtonProps>=({value, onClick}) =>{
    return ( 
        <button className="operator" onClick={onClick}>{value}</button>
    );
};

export default Button;