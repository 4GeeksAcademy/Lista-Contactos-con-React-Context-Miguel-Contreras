import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard";

export function Contact({ contacts }) {
    const { dispatch } = useGlobalReducer();

    const deleteContact = async (contactId) => {
    const slug = "miguel-contreras";
    const url = `https://playground.4geeks.com{slug}/contacts/${contactId}`;

    try {
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            // Si la API lo borra, actualizamos el store local
            dispatch({ type: "load_contacts", payload: store.contacts.filter(c => c.id !== contactId) });
        }
    } catch (error) {
        console.error("Error al borrar:", error);
    }
};

    return (
        // Quitamos clases de contenedores o bordes, solo dejamos el layout de las cards
        <>
            {contacts && contacts.map((c, index) => (
                <ContactCard 
                    key={index} 
                    contact={c} 
                    index={index} 
                    onDelete={() => dispatch({ type: "delete_contact", payload: index })} 
                />
            ))}
        </>
    );
}








