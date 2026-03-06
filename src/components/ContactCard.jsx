import { useNavigate } from "react-router-dom";

// Asegúrate de recibir { contact, onDelete, index } entre llaves
export const ContactCard = ({ contact, onDelete, index }) => {
    const navigate = useNavigate();
    if (!contact) return null;

    return (
        <div className="card d-flex flex-row mb-3 shadow-sm" style={{ width: "100%", maxWidth: "700px" }}>
            {/* IMAGEN DINÁMICA */}
            <img
   src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${contact.name}`}
    alt="avatar"
    className="rounded-circle m-3"
    style={{ width: '80px', height: '80px', minWidth: '80px', backgroundColor: '#eef' }}
/>


            <div className="card-body d-flex justify-content-between align-items-center">
                {/* DATOS DEL CONTACTO */}
                 <div>
                    <h5 className="card-title mb-1">{contact.name}</h5>
                    <p className="text-muted mb-1"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                    <p className="text-muted mb-1"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                    <p className="text-muted mb-0"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                </div>

                {/* BOTONES DE ACCIÓN */}
                 <div className="d-flex gap-3">
                    <button
                        className="btn btn-outline-dark border-0"
                        onClick={() => navigate("/editContact", { state: { contact, index } })}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                        className="btn btn-outline-danger border-0"
                        onClick={() => {
                            if (window.confirm(`¿Seguro que quieres eliminar a ${contact.name}?`)) { // CAMBIADO: name
                                onDelete();
                            }
                        }}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};