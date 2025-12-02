import { Link } from 'react-router-dom';

function MenuReg() {
  return (
    <>
      <div className="menu-derecho">
        <ul className="menu-lista">
          <li>
            <Link to="/Registrar" id="menu-alumno" data-testid="menu-alumno" className="menu-item">
              <span>Alumno</span>
            </Link>
          </li>
          <li>
            <Link to="/RegistrarAdmin" id="menu-admin" data-testid="menu-admin" className="menu-item">
              <span>Administrativo</span>
            </Link>
          </li>
          <li>
            <Link to="/RegistrarInvitado" id="menu-invitado" data-testid="menu-invitado" className="menu-item">
              <span>Invitado</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
export default MenuReg;