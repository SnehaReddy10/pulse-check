import { Route, Routes } from 'react-router';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
