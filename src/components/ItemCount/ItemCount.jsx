import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

const ItemCount = ({initial,maxprod,onAdd}) => {


    const [count,setCount] = useState(initial)

    const increment = () => {
        if(count<maxprod){
            setCount(count+1)
        }
    }

    const decrement = () => {
        if(count>initial){
            setCount(count-1)
        }
    }
    return (
        <div>
            <Button style={{ margin: '10px', padding: '10px'}} variant="outline-primary" onClick={increment}> + </Button>
            <span>{count}</span>
            <Button style={{ margin: '10px', padding: '10px'}} variant="outline-primary" onClick={decrement}> - </Button>
            <Button style={{ margin: '10px', padding: '10px'}} variant="outline-primary" onClick={()=>{onAdd(count)}}>Agregar al carrito</Button>
        </div>
    );
};

export default ItemCount;