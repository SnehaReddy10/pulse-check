import { Route, Routes } from 'react-router';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
