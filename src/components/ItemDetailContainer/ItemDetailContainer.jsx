//importamos el hook useContext para utilizarlo en consumir datos del contexto
import React, {useState,useEffect, useContext} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { Cartcontext } from '../../context/Cartcontext';

const ItemDetailContainer = () => {

    const [alimento, setAlimento] = useState(null)
    // En este objeto tenemos que delcarar todo lo que vamos a recibir del contexto
    const {} = useContext(Cartcontext)
    const {alimentoId} = useParams()

    useEffect(()=>{
        const fetchData = () => {
            return fetch("/data/saborescaseros.json")
            .then((response)=>response.json())
            .then((data)=> {
                const foundProduct = data.find((item)=> item.id == alimentoId) 
                setAlimento(foundProduct)
            })
            .catch((error)=>console.log(error))
        }

        fetchData()
    },[alimentoId])

    return (
        <div>
            {
                alimento ? <ItemDetail alimentodet={alimento}/> : <p>CARGANDO..</p>
            }
        </div>
    );
};

export default ItemDetailContainer;