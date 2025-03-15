// importar las constantes (const.js)
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../const.js";

// Aquí va el estado inicial basado en la estructura de la tabla de la API
const initialState = {
  auth: {
    user: {
      id: null,
    },
    error: null,
  },
  authemp: {
    user: {
      id: null,
    },
    error: null,
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Lógica para manejar la acción de éxito
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          error: null,
        },
      };

    case LOGIN_FAILURE:
      // Lógica para manejar la acción de error
      return {
        ...state,
        auth: {
          ...state.auth,
          user: initialState.auth.user, // Restablece el usuario en caso de error
          error: action.payload,
        },
      };

    default:
      return state;
  }
}