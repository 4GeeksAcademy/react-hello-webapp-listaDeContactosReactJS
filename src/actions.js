// actions.js = aquí viven las funciones que hablan con la API
// Estas funciones son como "las manos" que traen datos y los guardan en el store


const API_BASE = "https://playground.4geeks.com/contact";

// AGENDA = el nombre de tu libreta de contactos en la API
const AGENDA = "sergio-agenda"; // 
// ✅ READ: traer contactos
export const getContacts = async (dispatch) => {
  // dispatch = botón  para cambiar el store global

  try {
    // 1) pedimos contactos 
    const resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`);

    // 2) Si la agenda NO existe (porque Swagger la borró)
    // la API normalmente responde 404
    // Entonces aquí detectamos eso y mostramos un mensaje cute
    if (!resp.ok) {
      // un mensaje en el store para que Home lo muestre
      dispatch({
        type: "set_error",
        payload: "⚠️ No olvides update Swagger si quieres verlo funcionar"
      });

      // También dejamos la lista vacía 
      dispatch({ type: "set_contacts", payload: [] });
      return;
    }

    // 3) Si todo sale bien, limpiamos el error (por si antes había uno)
    dispatch({ type: "clear_error" });
    // 4) convertimos la respuesta en JSON (datos entendibles)
    const data = await resp.json();

    // 5) a veces la API devuelve { contacts: [...] }
    // y a veces devuelve directamente [...]
    // entonces usamos "??" para escoger lo que exista
    const contacts = data.contacts ?? data;

    // 6) guardamos esos contactos en el store usando dispatch
    dispatch({ type: "set_contacts", payload: contacts });

  } catch (error) {
    // Si se cae internet o la API no responde
    dispatch({
      type: "set_error",
      payload: "No se pudo conectar a la API. Revisa tu internet o intenta más tarde."
    });

    // Dejamos contactos vacíos
    dispatch({ type: "set_contacts", payload: [] });
  }
};

// CREATE: crear contacto nuevo
export const addContact = async (dispatch, contact) => {
  // contact = objeto con name, email, phone, address

  try {
    // 1) enviamos el contacto a la API con POST
    const resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact) // convertimos el objeto a texto JSON
    });

    // Si falla, guardamos mensaje
    if (!resp.ok) {
      dispatch({
        type: "set_error",
        payload: "⚠️ No pude crear el contacto."
      });
      return;
    }

    // 2) después de crear, volvemos a pedir la lista para refrescar
    await getContacts(dispatch);

  } catch (error) {
    dispatch({
      type: "set_error",
      payload: " Error creando el contacto. Intenta otra vez."
    });
  }
};

// UPDATE: actualizar contacto
export const updateContact = async (dispatch, id, contact) => {
  try {
    const resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });

    if (!resp.ok) {
      dispatch({
        type: "set_error",
        payload: "No pude actualizar el contacto."
      });
      return;
    }

    await getContacts(dispatch);

  } catch (error) {
    dispatch({
      type: "set_error",
      payload: " Error actualizando el contacto. Intenta otra vez."
    });
  }
};

// DELETE: borrar un contacto
export const deleteContact = async (dispatch, id) => {
  try {
    const resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts/${id}`, {
      method: "DELETE"
    });

    if (!resp.ok) {
      dispatch({
        type: "set_error",
        payload: "No pude borrar el contacto. Revisa que la agenda exista en Swagger."
      });
      return;
    }

    await getContacts(dispatch);

  } catch (error) {
    dispatch({
      type: "set_error",
      payload: "Error borrando el contacto. Intenta otra vez."
    });
  }
};


