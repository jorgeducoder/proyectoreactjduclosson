import { useState, useEffect } from 'react'
import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from "./components/NavBar/Navbar"
import Button from './components/Button/Button'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Mensaje from './components/Mensaje/Mensaje'
/* El unico lugar donde se importa el contexto es donde se engloba la aplicacion.CartProvider. Y el contexto donde se utilice*/
import { CartProvider } from './context/Cartcontext'
import Cart from './components/Cart/Cart'

function App() {

  return (
    <>
      <BrowserRouter>
        
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/ItemListContainer' element={<ItemListContainer />} />
            <Route path='/ItemListContainer/:categoriaId' element={<ItemListContainer />} />
            <Route path='/item/:alimentoId' element={<ItemDetailContainer />} />
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Mensaje' element={<Mensaje />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>

    </>
  )
}

export default App





