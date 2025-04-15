import Cabeza from '../Cabeza'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Opciones from "./Opciones"

const Menu = () =>{
return(
    <>
    <Cabeza />
    <Opciones />
    </>
);
}

export default Menu;