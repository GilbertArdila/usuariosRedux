import {
  TRAER_TODAS,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  CARGANDO,
  ERROR,
  CHECKED,
  LIMPIAR
} from "../types/tareasTypes";

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: "",
  usuario_id: "",
  titulo: "",
  regresar: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODAS:
      return {
        ...state,
        tareas: action.payload,
        cargando: false,
        error: "",
        regresar: false,
      };
    case CARGANDO:
      return { ...state, cargando: true };
    case ERROR:
      return { ...state, error: action.payload, cargando: false };
    case CAMBIO_USUARIO_ID:
      return {
        ...state,
        usuario_id: action.payload,
      };
    case CAMBIO_TITULO:
      return { ...state, titulo: action.payload };
    case GUARDAR:
      return {
        ...state,
        tareas: {},
        cargando: false,
        error: "",
        usuario_id: "",
        regresar: true,
        titulo: "",
      };
    case CHECKED:
      return { ...state, tareas: action.payload };
    
    case LIMPIAR:
      return{
        ...state,
        usuario_id: "",
        titulo: ""
      }  
      default: return state;
  }
};
