import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavbarComponent from './components/Navbar'
import Products from "./components/Products";
import LandingPage from './pages/Landing'
import CartPage from './pages/Cart'
import NotFound from './pages/NotFound'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([])
  // INCREASE
  const addToCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id)

      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      }

      return [...prev, { id, qty: 1 }]
    })
  }

  // DECREASE
  const decreaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty - 1) }
          : item
      )
    )
  }

  // REMOVE
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }


  return (
    <>
      <BrowserRouter>
        <NavbarComponent cart={cart} />
        <Container className='text-center my-5'>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  cart={cart}
                  addToCart={addToCart}
                />}
            />
            <Route
              path="/products"
              element={
                <Products
                  cart={cart}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                  removeFromCart={removeFromCart}
                />
              }
            />

            <Route path="/cart" element={<CartPage cart={cart}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
            />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App