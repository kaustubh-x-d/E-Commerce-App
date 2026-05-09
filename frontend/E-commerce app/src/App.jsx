import {BrowserRouter, Route, Routes} from 'react-router-dom'

import LoginForm from './components/login'
// import Home from './components/home'
import Products from './components/Products'
// import Cart from './components/Cart'
// import ProtectedRoute from './components/ProtectedRoute'
// import ProductItemDetails from './components/ProductItemDetails'
// import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  return(
    <div>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/products"
        element={
          
            <Products/>
          
        }
      />
       {/* <Route
        path="/"
        element={
          
            <LoginForm />
          
        }
      /> */}
      {/*
      
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductItemDetails />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} /> */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
  </div>
  )
}
export default App
