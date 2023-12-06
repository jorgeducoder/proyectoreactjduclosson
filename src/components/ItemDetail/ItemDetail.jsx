import React,{ useContext, useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { Cartcontext } from '../../context/Cartcontext';

// En ItemDetail tenemos el producto y la cantidad elegida

const ItemDetail = ({alimentodet}) => {
    // falta revisar clase anterior
    const [quantity,setQuantity] = useState(0)
    const {addToCart} = useContext(Cartcontext)

    const onAdd = (cantidad) => {
        setQuantity(cantidad)
        addToCart(alimentodet,cantidad)
        
        //Paso al context el producto y la cantidad para que lo tome el cart
    }
    
    return (
        <div>
            <img src={alimentodet.img} alt={alimentodet.nombre} style={{ margin: '10px', padding: '10px', width: '30%'}}/>
            <h2>{alimentodet.nombre}</h2>
            <p>Pedido máximo: {alimentodet.maxprod}</p>
            <p>Precio: {alimentodet.precio}</p>
            <p>Categoria: {alimentodet.categoria}</p>
            <p>Descripción: {alimentodet.recetadesc}</p>
            {quantity == 0 ? <ItemCount initial={1} maxprod={alimentodet.maxprod} onAdd={onAdd}/>
            :
            <Link to={"/Cart"}>Ir al carrito</Link>
            }
            
        </div>
    );
};

export default ItemDetail;