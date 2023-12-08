//importamos el hook useContext para utilizarlo en consumir datos del contexto
import React, {useState,useEffect, useContext} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { Cartcontext } from '../../context/Cartcontext';
// Paso 1 importamos metodos de firestore a usar
import {getDoc,getFirestore,doc} from "firebase/firestore";

const ItemDetailContainer = () => {

    const [alimento, setAlimento] = useState(null)
    // En este objeto tenemos que delcarar todo lo que vamos a recibir del contexto
    const {} = useContext(Cartcontext)
    const {alimentoId} = useParams()

    useEffect(()=>{
       // Paso 2 instanciamos la base

       const db = getFirestore()

       // paso 3 recibimos el documento por su ID
       
       const detalleDoc = doc(db,"alimentos", alimentoId)
       
       // paso 4 llamar al documento y renderizarlo

       getDoc(detalleDoc)
       .then((res)=>{
       
            const data = res.data();
            const nuevoAlimento = {id: res.id,...data}
            setAlimento(nuevoAlimento)
        })
            
        .catch((error)=> console.log(error))


        // codigo cuando usamos JSON
        /* const fetchData = () => {
            return fetch("/data/saborescaseros.json")
            .then((response)=>response.json())
            .then((data)=> {
                const foundProduct = data.find((item)=> item.id == alimentoId) 
                setAlimento(foundProduct)
            })
            .catch((error)=>console.log(error))
        }

        fetchData()*/
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