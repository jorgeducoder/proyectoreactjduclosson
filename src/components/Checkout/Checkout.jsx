import React, { useState, useEffect, useContext } from 'react';
import { collection, addDoc, updateDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import { Cartcontext } from '../../context/Cartcontext';
import { MdRemoveShoppingCart } from "react-icons/md";



const Checkout = () => {
    //Campos del formulario
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, seterror] = useState("");

    const [ordenId, setOrdenId] = useState("");

    // Datos necesarios del context
   
    const { cart, getTotalenpesosItems, clearCart } = useContext(Cartcontext)
   
    console.log(cart)
   
    // SUBMIT
    const manejadorFormulario = (event) => {
        // Evitamos que se ejecute el evento submit por defecto.
        event.preventDefault()

        //Algunos manejos de errores
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            seterror("Hay campos requeridos sin completar")
            return;
        }
        if (email !== emailConfirmacion) {
            seterror("Los email no coinciden")
            return;
        }
      
        
        // Creamos la instancia de la DB
        const db = getFirestore()
             
    
        // Generamos el objeto de la orden de compra
        const orden = {
            items: cart.map((alimentodet) => ({
                
                id: alimentodet.alimentodet.id,
                nombre: alimentodet.alimentodet.nombre,
                cantidad: alimentodet.cantidad
                
            })),
            total: getTotalenpesosItems(),
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        }
    
        
        // Generamos la logica para la orden y reduccion del stock.

        Promise.all(
            orden.items.map(async (alimentosOrden) => {
                const alimentoRef = doc(db, "alimentos", alimentosOrden.id);
                const alimentoDoc = await getDoc(alimentoRef);
                const maxprodActual = alimentoDoc.data().maxprod;

                // Por diseño de esta App hay produccion maxima, no stock.
                // Se considera que en cada orden, cada alimento tiene un maximo a producir.
                
                {console.log(maxprodActual)}
                
                await updateDoc(alimentoRef, {
                    maxprod: maxprodActual - alimentosOrden.cantidad,
                });

            })
          )
            .then(() => {
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        {clearCart};
                    })
                    .catch((error) => {
                        console.log("Error al crear la orden", error);
                        seterror("Se produjo un error al guardar la orden");
                    });
                })
            .catch((error) => {
                console.log("No se pudo actualizar el stock", error);
                seterror("Se produjo un error al actualizar maximo a producir, intentelo mas tarde");
                });
    }    
            
        
    return (
            //Armado del formulario
            <div>

               

                {/* Mapeamos los productos*/}
                
                    {cart.map((alimentodet) => (
                        <div key={alimentodet.alimentodet.id}>
                            
                            <p>
                                {" "}
                                {alimentodet.alimentodet.nombre} x {alimentodet.cantidad}{" "}
                            </p>
                            <p>{alimentodet.alimentodet.precio}</p>{" "}
                            
                        <hr />
                        </div>
                   ))}
                <br/>
                 <h2>Ingresa tus datos</h2>
                 <br/>
                {/* Campos del Formulario*/}
                
                <form onSubmit={manejadorFormulario} className = "formulario">
                    <div>
                        <label htmlFor=''>Nombre</label>
                        <input type="text" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Apellido  </label>
                        <input type="text" onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Telefono  </label>
                        <input type="number" onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Email  </label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Confirmar Email  </label>
                        <input type="email" onChange={(e) => setEmailConfirmacion(e.target.value)} /><br/>
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Comprar</button>
                    {
                        ordenId && (
                            <p>
                                Gracias por tu compra!! Tu número de ID es: {ordenId}
                            </p>
                        )
                    }
                    <button onClick={clearCart}><MdRemoveShoppingCart /></button>
                </form>
            </div>
        );
    };

    export default Checkout;