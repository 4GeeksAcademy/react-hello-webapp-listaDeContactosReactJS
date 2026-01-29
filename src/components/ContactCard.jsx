import React from "react";
import { useNavigate } from "react-router-dom";

// Este componente muestra un solo contacto
export const ContactCard = ({ contact, onAskDelete }) => {

  const navigate = useNavigate();

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">

      {/* Lado izquierdo: imagen + info */}
      <div className="d-flex align-items-center">

        {/* Imagen */}
        <img
  src="/src/assets/img/rigo-baby.jpg"
  className="rounded-circle me-3"
  width="80"
  height="80"
  alt="avatar"
/>


        {/* Info del contacto */}
        <div>
          <h5 className="mb-1">{contact.name}</h5>

          <p className="mb-1 text-muted">
            <i className="fas fa-map-marker-alt me-2"></i>
            {contact.address}
          </p>

          <p className="mb-1 text-muted">
            <i className="fas fa-phone me-2"></i>
            {contact.phone}
          </p>

          <p className="mb-0 text-muted">
            <i className="fas fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>
      </div>

      {/* Lado derecho: iconos */}
      <div className="d-flex gap-3">

        {/* Edit */}
        <i
          className="fas fa-pen"
          style={{ cursor: "pointer", color: "#555"}}
          onClick={() => navigate(`/edit/${contact.id}`)}
        />

        {/* Delete */}
        <i
          className="fas fa-trash"
          style={{ cursor: "pointer", color: "#555"}}
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          onClick={onAskDelete}
          
        />
      </div>

    </div>
  );
};
