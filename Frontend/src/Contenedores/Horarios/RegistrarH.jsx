import { Link } from 'react-router-dom';

function RegistrarH() {
  return (
    <>
    <div className="menu-derecho">
      <ul className="menu-lista">
        <li>
          <Link to="/RegistrarHorario" className="menu-item">
            <span>Registrar Horario</span>
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
}
export default RegistrarH;