import axios from 'axios';
import {CARGANDO, TRAER_TODOS,ERROR} from '../types/usuariosTypes'

//siempre debe tener los tres casos cargando,exitoso y error para que el usuario sepa que está pasando
export  const traerTodos=()=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    });
   try {
    const response= await axios.get('https://jsonplaceholder.typicode.com/users')

    dispatch({
        type:TRAER_TODOS,
        payload:response.data
    })
    
   } catch (error) {
      
      dispatch({
        type:ERROR,
        payload:['Usuarios no disponibles, por favor intenta más tarde  ',error.message]
      })
   }
}