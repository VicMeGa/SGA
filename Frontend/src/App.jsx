import './App.css'
import Login from './Contenedores/Login'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Menu from './Contenedores/Menu/Menu';
import Registrar from './Contenedores/Registar/Registrar'
import RegAdminis from './Contenedores/Registar/RegAdminis';
import RegInvitado from './Contenedores/Registar/RegInvitado';
import Modificar from './Contenedores/Modificar/Modificar';
import Articulos from './Contenedores/Articulos/Articulos';
import Prestamo from './Contenedores/Articulos/Prestamo/Prestamo';
import NewArticulo from './Contenedores/Articulos/añadir/NewArticulo';
import Horario from './Contenedores/Horarios/Horario';
import RegistrarSala from './Contenedores/Horarios/RegistrarSala/RegistrarSala';
import ControlAsistencias from './Contenedores/Horarios/ControlAsistencias/ControlAsistencias';
import Reportes from './Contenedores/Reportes/Reportes'
import RegistrarHorario from './Contenedores/Horarios/RegistarHorario/RegistrarHorario';
import RegistrarCuenta from './Contenedores/RegisCuenta/RegistrarCuenta';
import ProtectedRoute from './hook/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/next" element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } />
          <Route path="/Registrar" element={<ProtectedRoute>
            <Registrar />
          </ProtectedRoute>} />
          <Route path="/RegistrarAdmin" element={
            <ProtectedRoute>
              <RegAdminis />
            </ProtectedRoute>
          } />
          <Route path="/RegistrarInvitado" element={
            <ProtectedRoute>
              <RegInvitado />
            </ProtectedRoute>
          } />
          <Route path="/ModificarUsuario" element={
            <ProtectedRoute>
              <Modificar />
            </ProtectedRoute>
          } />
          <Route path="/Articulos" element={
            <ProtectedRoute>
              <Articulos />
            </ProtectedRoute>
          } />
          <Route path="/prestamo/:itemId" element={
            <ProtectedRoute>
              <Prestamo />
            </ProtectedRoute>
          } />
          <Route path="/NewArticulo" element={
            <ProtectedRoute>
              <NewArticulo />
            </ProtectedRoute>
          } />
          <Route path="/Horario" element={
            <ProtectedRoute>
              <Horario />
            </ProtectedRoute>
          } />
          <Route path="/RegistrarSala" element={
            <ProtectedRoute>
              <RegistrarSala />
            </ProtectedRoute>
          } />
          <Route path="/ControlAsistencias" element={
            <ProtectedRoute>
              <ControlAsistencias />
            </ProtectedRoute>
          } />
          <Route path='/Reportes' element={
            <ProtectedRoute>
              <Reportes />
            </ProtectedRoute>
          } />
          <Route path='/RegistrarHorario' element={
            <ProtectedRoute>
              <RegistrarHorario />
            </ProtectedRoute>
          } />
          <Route path='/RegistrarCuenta' element={<RegistrarCuenta />} />

        </Routes>
        <ToastContainer position="top-right" autoClose={3000 } />
      </Router>
    </>
  )
}

export default App
