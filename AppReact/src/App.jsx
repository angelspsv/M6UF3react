import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signin from './pages/Signin.jsx'
import PaginaUsuari from './pages/PaginaUsuari.jsx';
import FormulariProducte from './pages/FormulariProducte.jsx';



function App() {
  //variable per controlar l'estat d'inici de sessio
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuari, setUsuari] = useState('');
  const [admin, setAdmin] = useState(false);
  
  //faig servir <Navigate /> de react-router-dom per redirigir al login si isAuthenticated es FALSE
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} setUsuari={setUsuari} setAdmin={setAdmin} />} />
          <Route path="signin" element={<Signin />} />
          <Route path="paginausuari" element={ isAuthenticated ? <PaginaUsuari setIsAuthenticated={setIsAuthenticated} usuari={usuari} admin={admin} /> : <Navigate to="/login" replace /> } />
          <Route path="nou_producte" element={<FormulariProducte />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App