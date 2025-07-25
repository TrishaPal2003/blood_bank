import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Footer from './components/Footer';
import Login from "./pages/Login";
import BloodPostForm from "./pages/BloodPostForm";
import Profile from './pages/Profile';



function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bloodrquestform" element={<BloodPostForm />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/posts" element={<Posts />} />  */}

      </Routes>
       <Footer />
    </Router>
  );
}

export default App;
