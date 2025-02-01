import { Route, Routes } from 'react-router';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/common/Navbar';
import Home from './components/home/Home';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="px-40">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
