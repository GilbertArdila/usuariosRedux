import axios from "axios";
import {
  CARGANDO,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  TRAER_TODAS,
  GUARDAR,
  ERROR,
  CHECKED,
  LIMPIAR
} from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};
    //destructuramos por id del usuario y agregamos todas las tareas de ese usuario
    response.data.map(
      (tarea) =>
        (tareas[tarea.userId] = {
          ...tareas[tarea.userId],
          [tarea.id]: {
            ...tarea,
          },
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: [
        "Tareas no disponibles, por favor intenta más tarde  ",
        error.message,
      ],
    });
  }
};

export const cambioUsuarioId = (ususario_id) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: ususario_id,
  });
};

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo,
  });
};

export const agregar = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nueva_tarea
    );
    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: [
        "Falló al intentar crear tarea, intente más tarde  ",
        error.message,
      ],
    });
  }
};

export const editar = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada
    );
    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: [
        "Falló al intentar crear tarea, intente más tarde  ",
        error.message,
      ],
    });
  }
};

export const cambioCheck = (ususario_id, tarea_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[ususario_id][tarea_id];
  const actualizadas = {
    ...tareas,
  };
  actualizadas[ususario_id] = {
    ...tareas[ususario_id],
  };
  actualizadas[ususario_id][tarea_id] = {
    ...tareas[ususario_id][tarea_id],
    completed: !seleccionada.completed,
  };
  dispatch({
    type: CHECKED,
    payload: actualizadas,
  });
};

export const eliminarTarea = (tarea_id) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${tarea_id}`
    );
    dispatch({
      type: TRAER_TODAS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: [
        "Falló al intentar eliminar tarea, intente más tarde  ",
        error.message,
      ],
    });
  }
};
export const limpiarDatos=()=>(dispatch)=>{
  dispatch({
    type:LIMPIAR
  })
}