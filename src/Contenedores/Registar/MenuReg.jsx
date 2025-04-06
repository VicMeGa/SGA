import React from 'react';
import { Link } from 'react-router-dom';

function MenuReg() {
  return (
    <>
    <div className="menu-derecho">
      <ul className="menu-lista">
        <li>
          <Link to="/Registrar" className="menu-item">
            <span>Alumno</span>
          </Link>
        </li>
        <li>
          <Link to="/RegistrarAdmin" className="menu-item">
            <span>Administrativo</span>
          </Link>
        </li>
        <li>
          <Link to="/RegistrarInvitado" className="menu-item">
            <span>Invitado</span>
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
}
export default MenuReg;