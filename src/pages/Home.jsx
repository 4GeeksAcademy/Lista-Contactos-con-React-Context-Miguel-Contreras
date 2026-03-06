import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Contact } from "./Contact.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
    const fetchContacts = async () => {
        const slug = "miguel-contreras";
            const baseUrl = "https://playground.4geeks.com/contact";
            try {
                // 1. Intentamos ver si la agenda existe (Haciendo un GET a la agenda)
                const resp = await fetch(`${baseUrl}/agendas/${slug}`);

                if (resp.ok) {
                    const data = await resp.json();
                    dispatch({ type: "load_contacts", payload: data.contacts || [] });
                } else if (resp.status === 404) {
                    // POST /agendas/{slug} -> Si no existe, la creamos
                    await fetch(`${baseUrl}/agendas/${slug}/contact`, { method: "POST" });
                    dispatch({ type: "load_contacts", payload: [] });
                }
            } catch (error) {
                console.error("Error inicializando agenda:", error);
            }
        };
        fetchContacts();
    }, []);

    return (
    <div className="container mt-4">
        {/* Cabecera centrada */}
        <div className="d-flex justify-content-between align-items-center mb-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h1>Mis Contactos</h1>
            <Link to="/addContact">
                <button className="btn btn-success">Agregar Contacto</button>
            </Link>
        </div>

        {/* Contenedor de la lista CENTRADO */}
        <div className="d-flex flex-column align-items-center w-100">
            <Contact contacts={store.contacts} />
        </div>
    </div>
);
};