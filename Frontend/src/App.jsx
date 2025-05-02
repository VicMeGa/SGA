import { useState } from 'react'
import './App.css'
import  Login  from './Contenedores/Login'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Menu from './Contenedores/Menu/Menu';
import Registrar from './Contenedores/Registar/Registrar'
import RegAdminis from './Contenedores/Registar/RegAdminis';
import RegInvitado from './Contenedores/Registar/RegInvitado';
import Modificar from './Contenedores/Modificar/Modificar';
import Articulos from './Contenedores/Articulos/Articulos';

function App() {
    

  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/next" element={<Menu />}/>
            <Route path="/Registrar" element={<Registrar />} />
            <Route path="/RegistrarAdmin" element={<RegAdminis />} />
            <Route path="/RegistrarInvitado" element={<RegInvitado />} />
            <Route path="/ModificarUsuario" element={<Modificar />} />
            <Route path="/Articulos" element={<Articulos />} />
          </Routes>
    </Router>
    </>
  )
}

export default App
