
import './assets/commons.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Banner />
        <Footer />
        <Routes>
          <Route path="/" element=""></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
