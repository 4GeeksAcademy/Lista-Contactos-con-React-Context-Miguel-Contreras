import { Outlet } from "react-router-dom"; // Importación limpia
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Layout = () => {
    // El hook está perfecto aquí dentro
    const { store, dispatch } = useGlobalReducer(); 

    return (
        <ScrollToTop>
            <Navbar />
            {/* 
               IMPORTANTE: 
               Como ya definiste las rutas en el archivo 'routes.jsx', 
               aquí solo necesitas el <Outlet />. 
               El Router inyectará automáticamente la Home o AddContact aquí.
            */}
            <Outlet /> 
            <Footer />
        </ScrollToTop>
    );
};