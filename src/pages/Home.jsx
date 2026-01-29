// Aquí tengo que llamar React y useEffect
// React: lo necesito para crear componentes
// useEffect: lo uso para que algo se ejecute automáticamente
// cuando la página aparece
import React, { useEffect, useState } from "react";

// Aquí traigo nuestro hook personalizado
// Este hook me da acceso al Context
// store = donde están los datos globales
// dispatch = lo uso para modificar esos datos
import useGlobalReducer from "../hooks/useGlobalReducer";

// Aquí llamo las funciones que hablan con la API
// getContacts: trae los contactos
// deleteContact: borra un contacto
import { getContacts, deleteContact } from "../actions";

// Importo el componente ContactCard
// Este componente se encarga de mostrar un contacto
import { ContactCard } from "../components/ContactCard";

// Importo useNavigate para poder cambiar de página
import { useNavigate } from "react-router-dom";

// Se crea el componente Home
// Este componente representa la pantalla principal "/"
export const Home = () => {
  // Aquí usamos el hook global
  // store: aquí están guardados los contactos
  // dispatch: sirve para cambiar el store
  const { store, dispatch } = useGlobalReducer();

  // useNavigate sirve para movernos entre rutas
  const navigate = useNavigate();

  // Aquí guardo el contacto que quiero borrar
  // Esto se usa para el modal de confirmación
  const [contactToDelete, setContactToDelete] = useState(null);

  // useEffect se ejecuta automáticamente cuando la página carga
  useEffect(() => {
    // Llamamos a getContacts
    // Le pasamos dispatch para que guarde los contactos en el store
    // Si la agenda está borrada en swagger, getContacts va a guardar un mensaje de error en el store
    getContacts(dispatch);

    // El array vacío [] significa que esto se ejecuta solo una vez
  }, []);

  // Esta función se ejecuta cuando el usuario confirma borrar
  const handleConfirmDelete = async () => {
    // Si no hay contacto seleccionado, no hacemos nada
    if (!contactToDelete) return;

    // Llamamos a la función que borra el contacto
    await deleteContact(dispatch, contactToDelete.id);

    // Limpiamos el estado
    setContactToDelete(null);
  };

  return (
    <div className="container p-4">
      {/* BOTÓN PARA IR A LA VISTA DE AGREGAR CONTACTO */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          Add new contact
        </button>
      </div>

      {/* MENSAJE CUANDO FALLA LA API / AGENDA BORRADA EN SWAGGER */}
      {/* Si store.errorMessage tiene texto, mostramos una alerta */}
      {store.errorMessage && (
        <div className="alert alert-warning text-center">
          {/* Este mensaje lo guardamos desde actions.js */}
          {store.errorMessage}
        </div>
      )}

      {/* Título de la página */}
      <h1 className="mb-4">Sergio's Agenda</h1>

      {/* Aquí se muestra la lista de contactos */}
      <div className="list-group">
        {/*
          Usamos map para recorrer el arreglo de contactos
          store.contacts viene del Context

          Por cada contacto se crea un ContactCard
        */}
        {store.contacts.map((contact) => (
          <ContactCard
            key={contact.id} // React necesita un key único
            contact={contact} // pasamos el contacto al componente
            onAskDelete={() => setContactToDelete(contact)} // abrimos el modal
          />
        ))}
      </div>

      {/* MODAL DE CONFIRMACIÓN PARA BORRAR */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setContactToDelete(null)}
              />
            </div>

            <div className="modal-body">
              If you delete this thing the entire universe will go down!
              <br />
              <strong>{contactToDelete ? contactToDelete.name : ""}</strong>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setContactToDelete(null)}
              >
                Oh no!
              </button>

              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleConfirmDelete}
              >
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
