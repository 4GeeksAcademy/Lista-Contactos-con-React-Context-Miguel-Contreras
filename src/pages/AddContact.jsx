import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';

export const AddContact = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', address: '' });
    const isEditing = location.state !== null;

    useEffect(() => {
        if (isEditing) {
            setFormData({
                fullName: location.state.contact.name, // Mapeamos name de la API a nuestro fullName del form
                email: location.state.contact.email,
                phone: location.state.contact.phone,
                address: location.state.contact.address
            });
        }
    }, [isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const slug = "miguel-contreras";
        const urlBase = `https://playground.4geeks.com/contact`;

        // Si editamos, añadimos el ID al final. Si no, usamos la urlBase tal cual.
        const urlFinal = isEditing 
        ? `${urlBase}/agendas/${slug}/contacts/${location.state.contact.id}` 
        : `${urlBase}/agendas/${slug}/contacts`;

    try {
        const response = await fetch(urlFinal, {
            method: isEditing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.fullName, // La API pide 'name'
                email: formData.email,
                phone: formData.phone,
                address: formData.address
            })
        });

        if (response.ok) {
            navigate('/'); // Volvemos a la Home y el useEffect de allí refrescará la lista
        }
    } catch (error) {
        console.error("Error al guardar contacto:", error);
    }
};

return (
    <div className="container mt-5">
        <h3>{isEditing ? "Editar Contacto" : "Añadir Contacto"}</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input name="fullName" value={formData.fullName} placeholder="Nombre"
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="form-control" required />
            <input name="email" value={formData.email} placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-control" required />
            <input name="phone" value={formData.phone} placeholder="Teléfono"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="form-control" />
            <input name="address" value={formData.address} placeholder="Dirección"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="form-control" />
            <button type="submit" className="btn btn-primary">{isEditing ? "Guardar Cambios" : "Guardar Contacto"}</button>
        </form>
    </div>
);
};