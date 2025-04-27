import Cabecalho from "./components/Cabecalho/indexCabecalho";
import Rodape from "./components/Rodape/indexRodape";
import Inicio from "./pages/Inicio";
import Revistas from "./pages/Revistas/indexRevistas";
import Processos from "./pages/Processos/indexProcessos";
import Acompanhar from "./pages/Acompanhar/indexAcompanhar.js";
import Favoritos from "./pages/Favoritos/indexFavoritos.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes() {

    return (
        <BrowserRouter>
            <Cabecalho />
            <Routes>
                <Route path="/" element={<Inicio />}></Route>
                <Route path="/Revistas" element={<Revistas />}></Route>
                <Route path="/Acompanhar" element={<Acompanhar />}></Route>
                <Route path="/Processos" element={<Processos />}></Route>
                <Route path="/Favoritos" element={<Favoritos />}></Route>
            </Routes>
            <Rodape />
        </BrowserRouter>
    )
}
export default AppRoutes;