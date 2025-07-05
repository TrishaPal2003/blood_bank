import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Footer from './components/Footer';



function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         <Route path="/register" element={<Register />} />
      </Routes>
       <Footer />
    </Router>
  );
}

export default App;
