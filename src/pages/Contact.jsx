import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard";

export function Contact({ contacts }) {
    const { store, dispatch } = useGlobalReducer(); // Añadimos store para filtrar luego

    const deleteContact = async (contactId) => {
        const slug = "miguel-contreras";
    const url = `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`;

    try {
            const response = await fetch(url, { method: "DELETE" });
            if (response.ok) {
                // Filtramos los contactos actuales quitando el que tiene ese ID
                const updatedContacts = store.contacts.filter(c => c.id !== contactId);
                dispatch({ type: "load_contacts", payload: updatedContacts });
            }
        } catch (error) {
            console.error("Error al borrar:", error);
        }
    };

    return (
        <>
            {contacts && contacts.map((c, index) => (
                <ContactCard 
                    key={c.id || index} // Mejor usar c.id si existe
                    contact={c} 
                    index={index} 
                    // AHORA SÍ llamamos a la función que borra en la API
                    onDelete={() => deleteContact(c.id)} 
                />
            ))}
        </>
    );
}








