
import './assets/commons.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element=""></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
