import React, { useContext } from 'react';
/*import { BsCartFill } from "react-icons/bs";*/
import { FaShoppingCart } from "react-icons/fa";
import { Cartcontext } from '../../context/Cartcontext';
import { Link } from "react-router-dom";




const CartWidget = () => {
    
    const {getTotalItems} = useContext(Cartcontext)
    return (
        <div>
            <div style={{marginRight: "20px", padding: "10px 10px 0px 10px", color: "blue"}}>
                {/* <BsCartFill/>  Asi se pone un comentario dentro react js*/} 
                 <Link to = "/Cart">
                   <FaShoppingCart /> 
                 </Link>
            </div>
            { getTotalItems()>0 ? <p style={{marginRight: "20px", fontSize: "20px", fontWeight: "bolder"}}>{getTotalItems()}</p>
            : <p></p>}
            
        </div>
    );
};

export default CartWidget;