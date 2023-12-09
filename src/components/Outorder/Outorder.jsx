import { useState, useEffect, useContext } from 'react';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { Cartcontext } from '../../context/Cartcontext';



const Outorder = () => {
    alert("entro a Outorder")
    //Campos del formulario
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, seterror] = useState("");
    const [ordenId, setOrdenId] = useState("");

    // Datos necesarios del context
    const { cart, total, cantidadTotal, clearcart } = useContext(Cartcontext)
    alert("defini usecontext")
    // SUBMIT
    const manejadorformulario = (event) => {
        // Evitamos que se ejecute el evento submit por defecto.
        event.preventDefault()
        alert("entro a manejador de formularios")
        //Algunos manejos de errores
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            seterror("Hay campos requeridos sin completar")
            return;
        }
        if (email !== emailConfirmacion) {
            seterror("Los email no coinciden")
            return;
        }
        
        // Generamos el objeto de la orden de compra
        const orden = {
            items: cart.map((alimentos) => ({
                id: alimentos.alimentodet.id,
                nombre: alimentos.alimentodet.nombre,
                cantidad: alimentos.cantidad
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        }

        // Generamos la logica para la orden y reduccion del stock.

        Promise.all(
            orden.items.map(async (alimentosOrden) => {
                const alimentoRef = doc(db, "alimentos", alimentosOrden)
                const alimentoDoc = await getDoc(alimentoRef)
                const maxprodActual = alimentoDoc.data().maxprod

                // Por diseño de esta App hay produccion maxima, no stock.
                // Se considera que en cada orden, cada alimento tiene un maximo a producir.
                await updateDoc(alimentoRef, {
                    maxprod: maxprodActual - alimentosOrden.cantidad
                })

            })
        )
            .then(() => {
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        clearcart()
                    })
                    .catch((error) => {
                        seterror("Se produjo un error al guardar la orden")
                    })
                    .catch((error) => {
                        seterror("Se produjo un error al actualizar maximo a producir, intentelo mas tarde")
                    })
            })

        return (
            //Armado del formulario
            
            <div>
                
                <h2>Ingresa tus datos</h2>

                {/* Mapeamos los productos*/}

                
                    cart.map((alimentos) => {
                        <div key={alimentos.alimento.id}>
                            <p>
                                {alimentos.alimento.nombre} x {alimentos.cantidad}
                            </p>
                            <p>{alimentos.alimento.precio}</p>
                        </div>
                    })
                

                {/* Campos del Formulario*/}
                <Form onSubmit={manejadorformulario}>
                    <div>
                        <label htmlFor=''>Nombre</label>
                        <input type="text" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Apellido</label>
                        <input type="text" onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Telefono</label>
                        <input type="number" onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>Confirmar Email</label>
                        <input type="email" onChange={(e) => setEmailConfirmacion(e.target.value)} />
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

                </Form>
            </div>
        );
    };
}

export default Outorder;