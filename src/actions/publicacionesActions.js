import axios from "axios";
import {
  ACTUALIZAR_PUBLICACIONES,
  ACTUALIZAR_COMENTARIOS,
  CARGANDO,
  ERROR,
  COM_CARGANDO,
  COM_ERROR,
} from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO,
  });

  const { UsuariosReducer } = getState();
  const { publicaciones } = getState().publicacionesReducer;

  const usuario_id = UsuariosReducer.usuarios[key].id;
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );
    const nuevas = response.data.map((publicacion) => ({
      ...publicacion,
      comnetarios: [],
      abierto: false,
    }));

    const publicaiones_actualizadas = [...publicaciones, nuevas];
    dispatch({
      type: ACTUALIZAR_PUBLICACIONES,
      payload: publicaiones_actualizadas,
    });

    const publicaciones_key = publicaiones_actualizadas.length - 1;
    const usuarios_actualizados = [...UsuariosReducer.usuarios];
    usuarios_actualizados[key] = {
      ...UsuariosReducer.usuarios[key],
      publicaciones_key,
    };

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: [
        "Públicaciones no disponibles, intenta más tarde por favor  ",
        error.message,
      ],
    });
  }
};

export const abrirCerrar = (id, key) => (dispatch, getState) => {
  //este key es com_key y pub_key siempre es cero (o key)
  dispatch({
    type: CARGANDO,
  });

  let { publicaciones } = getState().publicacionesReducer;

  //publicacón seleccionada
  const seleccionada = publicaciones[0][key];

  try {
    //cambiamos el atributo abierto en la publicación seleccionada
    const actualizada = {
      ...seleccionada,
      abierto: !seleccionada.abierto,
    };
    //inmutabilidad
    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[0] = [...publicaciones[0]];
    //actualizamos solo la publicación seleccionada
    publicaciones_actualizadas[0][key] = actualizada;

    dispatch({
      type: ACTUALIZAR_PUBLICACIONES,
      payload: publicaciones_actualizadas,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: [error.message],
    });
  }
};

export const traerComentarios = (key) => async (dispatch, getState) => {
  //este key es com_key y pub_key siempre es cero (o key)
  dispatch({
    type: COM_CARGANDO,
  });

  let { publicaciones } = getState().publicacionesReducer;

  //publicacón seleccionada
  const seleccionada = publicaciones[0][key];
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`
    );
    const actualizada = {
      ...seleccionada,
      comnetarios: response.data,
    };
    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[0] = [...publicaciones[0]];
    //actualizamos solo la publicación seleccionada
    publicaciones_actualizadas[0][key] = actualizada;
    dispatch({
      type: ACTUALIZAR_COMENTARIOS,
      payload: publicaciones_actualizadas,
    });
  } catch (error) {
    dispatch({
      type: COM_ERROR,
      payload: ["Error al tratar de traer los comentarios  ", error.message],
    });
  }
};
