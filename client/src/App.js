import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './features/Home';
import Bags from 'features/Bags';
import Lugs from 'features/Lugs';
import Accessories from 'features/Accessories';
import ProductDetail from 'features/ProductDetail';
import Cart from 'features/Cart';
import React from 'react';
import Payment from 'features/Payment';
import Map from 'features/Map';
import User from 'features/User';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/bags" element={<Bags />} />
          <Route path="/user" element={<User />} />
          <Route path="/lugs" element={<Lugs />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/products">
            <Route path=':idProduct' element={<ProductDetail />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
