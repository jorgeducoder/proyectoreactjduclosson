import { useContext } from 'react';
import { Cartcontext } from '../../context/Cartcontext';
import ItemEnCart from '../ItemEnCart/ItemEnCart';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import Button from 'react-bootstrap/Button';

const Cart = () => {

   const { cart, clearCart, removeItem, getTotalItems, getTotalenpesosItems } = useContext(Cartcontext)
   console.log(cart)
   // Ejemplo de renderizado condicional
   return (
      <div>
         <h1> Tu Elección </h1>
         <ul>
            {
               cart.length > 0 ? (
                  cart.map((item) => {
                     return <li key={item.alimentodet.id}>
                        <ItemEnCart alimento={item.alimentodet} />
                        {/*Como vamos a pasar un parametro no podemos escribirlo asi  onClick={removeItem()}*/}
                        <p>Precio: ${item.alimentodet.precio}</p>
                        <p>Cantidad: {item.cantidad}</p>
                        <button onClick={() => removeItem(item.alimentodet.id)}><FaTrashAlt /></button>
                     </li>
                  })

               ) : (

                  <h3> No hay alimentos agregados ... </h3>

               )
            }
         </ul>

         <div>
            <h4>Total de Items: {getTotalItems()}     Valor total: ${getTotalenpesosItems()}</h4>
         </div>

         {cart.length > 0 ? (
            <div>
              {/*<Link to = {"/Checkout"}> Compra link con Checkout</Link>*/}
               <Button variant="success" as={Link} to={"/Checkout"}>Ver Orden</Button>
                           
               <br/>
               <br/>
               <button onClick={clearCart}><MdRemoveShoppingCart /></button>
            
            </div>
         ) : (

            <Link to={'/'}>Ir a inicio</Link>
         )}

      </div>
   )
};

export default Cart;

