import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './features/Home';
import Bags from 'features/Bags';
import Lugs from 'features/Lugs';
import Accessories from 'features/Accessories';
import ProductDetail from 'features/ProductDetail';
import Cart from 'features/Cart';
import { Button, Drawer } from 'antd';
import { StepForwardOutlined } from '@ant-design/icons';
import React from 'react';


function App() {
  const [open, setOpen] = React.useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" placement="right" open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/bags" element={<Bags />} />
          <Route path="/lugs" element={<Lugs />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/products">
            <Route path=':idProduct' element={<ProductDetail />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
