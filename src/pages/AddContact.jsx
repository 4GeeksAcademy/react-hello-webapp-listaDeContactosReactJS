// Aquí importo React y hooks
import React, { useEffect, useState } from "react";

// useNavigate: para regresar a home
// useParams: para saber si estoy editando (si viene id)
import { useNavigate, useParams } from "react-router-dom";

// Hook global para tener dispatch y store
import useGlobalReducer from "../hooks/useGlobalReducer";

// funciones de la API
import { addContact, updateContact, getContacts } from "../actions";

export const AddContact = () => {

  // navigate me permite moverme entre páginas
  const navigate = useNavigate();

  // params trae el id si estoy en /edit/:id
  const params = useParams();

  // saco store y dispatch del Context
  const { store, dispatch } = useGlobalReducer();

  // Si existe params.id entonces estoy editando
  const isEditing = !!params.id;

  // Estado del formulario
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  // Esto se ejecuta cuando entro a la página
  useEffect(() => {

    // Si estoy editando, necesito precargar los datos
    if (isEditing) {

      // Busco el contacto dentro de store.contacts
      const found = store.contacts.find(c => String(c.id) === String(params.id));

      // Si lo encontré, lleno el formulario
      if (found) {
        setForm({
          name: found.name || "",
          phone: found.phone || "",
          email: found.email || "",
          address: found.address || ""
        });
      } else {
        // Si NO lo encontré, pido contactos (por si entré directo a la ruta)
        getContacts(dispatch);
      }
    }

  }, [isEditing, params.id, store.contacts]);

  // Cada vez que escribo en un input, actualizo el form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Cuando le doy save
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si estoy editando → PUT
    if (isEditing) {
      await updateContact(dispatch, params.id, form);
    } else {
      // Si estoy creando → POST
      await addContact(dispatch, form);
    }

    // Regreso a la lista
    navigate("/");
  };

  return (
    <div className="container p-5">
      <h1>{isEditing ? "Edit contact" : "Add a new contact"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          save
        </button>
      </form>

      <button
        className="btn btn-link mt-2"
        onClick={() => navigate("/")}
      >
        or get back to contacts
      </button>
    </div>
  );
};
