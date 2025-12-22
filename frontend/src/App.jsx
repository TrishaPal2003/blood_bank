import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from "./pages/Login";
import BloodPostForm from './pages/BloodPostForm';
import Profile from './pages/Profile';
import Layout from './components/Layout'; 
import SearchDonor from "./pages/SearchDonor";
// import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* All pages that should have Navbar + Footer go under Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* "/" */}
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="request-blood" element={<BloodPostForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path='search-donor' element={<SearchDonor/>} />
          <Route path="test" element={<h1>🔥 TEST BLOOD PAGE</h1>} />

          {/* 404 fallback for any unknown route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
