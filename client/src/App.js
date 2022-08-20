
import './assets/commons.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element=""></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
