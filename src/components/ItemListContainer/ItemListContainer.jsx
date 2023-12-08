import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { ProgressBar } from  'react-loader-spinner';
import {collection,getDocs,getFirestore,query,where} from "firebase/firestore";



/* Se agrega el loading para controlar el renderizado condicional de la carga de items.
   Al inicio del use effect se vuelve a poner en true porque cuando cambie la categoria
   el componente se renderiza nuevamente*/

   const ItemListContainer = () => {

    const [alimentos, setAlimentos] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoriaId } = useParams()

    useEffect(() => {
        // Inicializamos el estado de carga de los productos
        setLoading(true);
       /* const fetchData = () => {
            return fetch("/data/saborescaseros.json")
                .then((response) => response.json())
                .then((data) => {

                    if (categoriaId) {
                        const filterProducts = data.filter((p) => p.categoria == categoriaId);

                        setAlimentos(filterProducts);

                    } else {
                        setAlimentos(data);
                    }
                })

                // Metodo de JS que se ejecuta al finalizar igual que el catch y setea el loading en false mas alla de lo que pase
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
        };
        // retrasamos la ejecucion de la funcion fethData hasta que no trabajemos con base de datos para ver el loading
        setTimeout(() => fetchData(), 2000)


        /*Hay que devolver la categoria para que se renderice el componente cada vez que se llama*/
        // SUSTITUYO POR ACCESO A FIRESTORE
        // Creamos la instancia de la BD
        const db = getFirestore()

        // generamos el filtrado de los productos
        const misalimentos = categoriaId
        ? query(collection(db,"alimentos"),where("categoria","==",categoriaId))
        : collection(db,"alimentos")

        // GENERAMOS LOS DOCUMENTOS SOLICITADOS
        getDocs(misalimentos)
        .then((res)=>{
            const nuevosAlimentos = res.docs.map((doc)=> {
                const data = doc.data()
                return {id: doc.id,...data}
            })
            setAlimentos(nuevosAlimentos)
        })
        .catch((error)=> console.log(error))
        .finally(()=>{
            //Cancelamos el loading y se muestran los productos
            setLoading(false)
        })


    }, [categoriaId]);

    return (
        <>
            {loading ? (

            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
            />

            ) : (

            <ItemList alimentos={alimentos} />
           )}

        </>
    );
};

export default ItemListContainer;