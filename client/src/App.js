import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Admin from 'features/Admin';
import Lug from 'features/Lug';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Lug />}></Route>
          <Route path="admin/*" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
