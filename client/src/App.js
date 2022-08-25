
import './assets/commons.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './features/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
