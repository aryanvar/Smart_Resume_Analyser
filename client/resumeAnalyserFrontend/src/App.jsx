import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import History from './pages/History';
import Resgister from './pages/Resgister';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
     <Route path="/" element={<Dashboard />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Resgister />} />
     <Route path="/history" element={<History />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
