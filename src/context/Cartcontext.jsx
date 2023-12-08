// Se crea el contexto y el provider en el mismo componente.

// Las dos siguientes sentencias crean el contexto.Importamos el estado porque permite cambiar el estado por lo tanto el estado de los consumidores
import React, {useState,createContext}  from "react"; 
export const Cartcontext = createContext()

// De aqui al final declaramos el proveedor

// Diferencia entre un export en linea o declaracion  y el export default
// En el primer caso se debe llamar cuando se importa con el mismo nombre
// En el segundo caso se puede nombrar con un nombre diferente.
// Como props usamos childen porque vamos a proveer las funciones del contexto. Que se define en App como CartProvider abarcando toda la aplicacion

export const CartProvider = ({children}) => {

// Aqui van las funionalidades del contexto
// primero el estado global que analiza el estado de compras
const[cart,setCart] = useState([]); 
const[totalEnpesos,setTotalenpesos] = useState(0)

// Necesitamos una funcion que se encargue de agregar productos al carrito y le ponemos nombre que querramos
const addToCart = (alimentodet,cantidad) => {
    if(!isInCart(alimentodet.id)){
        setCart((prev) => [...prev, {alimentodet,cantidad}])
        //setTotalenpesos(prev => prev + (alimentodet.precio*cantidad)) lo calculo en una funcion
    }else{

       // Error comun referirse al array de objetos+cantidad sin item.atributo.id y atributo.id
        
        const carritoActualizado = cart.map (prod => {
            if (prod.alimentodet.id === alimentodet.id) {
                return{...prod,cantidad: prod.cantidad + cantidad}
            }else{
                return prod;
            }
            
        })
        setCart (carritoActualizado)
    }
}

// Funcion que determina si el producto ya esta en el carrito
const isInCart = (itemId) => {
    return cart.some((i) => i.alimentodet.id === itemId)
    
}

// Funcion para saber el total de productos en el carrito y otra para calcular el total en el carrito

const getTotalItems = () => {
    let total = 0;
    cart.forEach((e) => total += e.cantidad) 

    return total

}

const getTotalenpesosItems = () => {
    let totalpesos = 0;
    //Calculo en esta funcion el total en pesos del arrito para no calcular cada ez ue agrega o saca
    cart.forEach((e) => totalpesos += (e.cantidad*e.alimentodet.precio))
    
    return totalpesos

}

/* Funcion encargada de remover alimentos del carrito
Filtra los que tienen distinto id  al que quiere remover
item es el objeto
alimentodet es el array del carrito 
id es el id del alimento en el array

Profe recomienda
MAP para mostrar el objeto
REDUCE para sumar dentro del objeto
FILTER para eliminar algo del objeto.
No se utilizan muchos mas que estos metodos en react
*/
// Falta renderizar el carrito para aplicar estos metodos
const removeItem = (id) => {
    const alimentoeliminado = cart.find((item)=> item.alimentodet.id == id)
    const filtrarCarrito = cart.filter((item)=> item.alimentodet.id !== id)
    setCart(filtrarCarrito)
    

}

// Funcion encargada de limpiar el carrito

const clearCart = () => {
    setCart([])
    setTotalenpesos(0)

}
 /* Aqui va el render del contexto.*/   
return (
            <Cartcontext.Provider value={
                {
                    cart,
                    totalEnpesos,
                    setCart,
                    addToCart,
                    isInCart,
                    getTotalItems, removeItem,
                    getTotalenpesosItems,
                    clearCart
                }
            }>
            {children}
                
            </Cartcontext.Provider>
        );
 //export default CartProvider;
    };


        