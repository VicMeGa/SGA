import { Users, UserPlus, Edit, Wallet, FileText } from 'lucide-react';
import Regresar from './Regresar'
import { useNavigate } from 'react-router-dom';

function Nav (){
  const navigate = useNavigate();
    return(
        <>
    <nav className="nav">
      <ul className="nav-ul">
        <li>
          <button className="nav-item"
            onClick={() => navigate('/registrar')}>
            <UserPlus className="nav-logo" />
          </button>
        </li>
        <li>
          <button className="nav-item"
            onClick={() => navigate('/ModificarUsuario')}>
            <Users className="nav-logo" />
          </button>
        </li>
        <li>
          <button className="nav-item"
          onClick={() => navigate('/Articulos')}>
            <Edit className="nav-logo" />
          </button>
        </li>
        <li>
          <button className="nav-item"
          onClick={() => navigate('/Horario')}>
            <Wallet className="nav-logo" />
          </button>
        </li>
        <li>
          <button className="nav-item">
            <FileText className="nav-logo" />
          </button>
        </li>
      </ul>
    </nav>
    <Regresar />
        </>
    );
}

export default Nav;