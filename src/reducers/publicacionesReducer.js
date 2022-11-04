import { ACTUALIZAR_PUBLICACIONES,ACTUALIZAR_COMENTARIOS,CARGANDO,ERROR,COM_CARGANDO,COM_ERROR } from "../types/publicacionesTypes";

const INITIAL_STATE={
    publicaciones:[],
    cargando:false,
    error:'',
    cargando_comentarios:false,
    comentarios_error:''
};

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ACTUALIZAR_PUBLICACIONES:
        return{
            ...state,
            publicaciones:action.payload,
            cargando:false,
            error:''
        }
        case ACTUALIZAR_COMENTARIOS:
            return{
                ...state,
                publicaciones:action.payload,
                cargando_comentarios:false,
                comentarios_error:''
            }
        case CARGANDO:
            return{...state,cargando:true} 
        case ERROR:
            return{...state,error:action.payload,cargando:false}     
        
        case COM_CARGANDO:
            return{...state,cargando_comentarios:true} 
        case COM_ERROR:
            return{...state,comentarios_error:action.payload,cargando_comentarios:false}     
        default:return state;  
    }
}