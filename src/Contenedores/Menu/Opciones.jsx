import { Link } from 'react-router-dom';
import { UserPlus, Users, FileSpreadsheet, Calendar, FileText } from 'lucide-react';

const Menu = () =>{
return(
    <>
    <div className="MEnu">
    <Link to="/Registrar">
        <span className="Opci" >Registrar Usuarios</span>
        <UserPlus size={70} />
      </Link>

      <Link to="/ModificarUsuario">
        <span className="Opci" >Modificar/Eliminar usuarios</span>
        <Users size={70} />
      </Link>

      <Link to="">
        <span className="Opci" >Articulos del laboratorio</span>
        <FileSpreadsheet size={70} />
      </Link>

      <Link to="">
        <span className="Opci" >Horario salas</span>
        <Calendar size={70} />
      </Link>

      <Link to="">
        <span className="Opci" >Generar reportes</span>
        <FileText size={70} />
      </Link>
      
    </div>
    </>
);
}

export default Menu;