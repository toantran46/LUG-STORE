import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Admin from 'features/Admin';
import Lug from 'features/Lug';
import { ToastContainer } from 'react-toastify';
import AdminRoute from 'components/AdminRoute';
import { useSelector } from 'react-redux';


function App() {
  const { isAuth } = useSelector(state => state.auth)
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Lug />}></Route>
          <Route path="admin/*" element={<AdminRoute isAllow={isAuth}><Admin /></AdminRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
