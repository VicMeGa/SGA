import { Link } from 'react-router-dom';

function RegisArti() {
  return (
    <>
    <div className="menu-derecho">
      <ul className="menu-lista">
        <li>
          <Link to="/NewArticulo" className="menu-item">
            <span>Registrar articulo</span>
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
}
export default RegisArti;