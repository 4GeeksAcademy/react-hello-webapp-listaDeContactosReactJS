// store.js = aquí vive la "memoria global" de la app
// Esta memoria se llama "store" y se comparte con TODA la app usando Context

// initialStore() devuelve el estado inicial (como empieza la app)
export const initialStore = () => {
  return {
    // contacts = a la lista de contactos que viene de la swager o la base de datos aquella
    contacts: [],

    // errorMessage = aquí mensajes de error
    errorMessage: null
  };
};

// storeReducer = una función que recibe:
// 1) store: el estado actual (la memoria actual)
// 2) action: lo que quieres hacer (ej: "set_contacts")
// y devuelve un NUEVO store actualizado
export default function storeReducer(store, action = {}) {
  // switch = aquí decidimos qué hacer dependiendo del tipo de acción
  switch (action.type) {

    //  "set_contacts"
    // "guarda esta lista de contactos en el store"
    case "set_contacts":
      return {
        ...store,                
        contacts: action.payload // y cambiamos SOLO contacts con lo nuevo
      };

    //  "set_message"
    // significa: "guarda un mensaje"
    case "set_message":
      return {
        ...store,
        message: action.payload
      };

    //  "set_error"
   
    case "set_error":
      return {
        ...store,
        errorMessage: action.payload
      };

    //  "clear_error"
    
    case "clear_error":
      return {
        ...store,
        errorMessage: null
      };

    default:
    
      return store;
  }
}

