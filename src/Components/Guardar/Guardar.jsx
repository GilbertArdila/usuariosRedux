import React,{useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import {connect} from 'react-redux';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import * as tareasActions from '../../actions/tareasActions'

const Guardar = (props) => {

  const{usuario_id,tarea_id}=useParams()
  const navigate=useNavigate()

  useEffect(() => {
   
    const{tareas,cambioUsuarioId,cambioTitulo,limpiarDatos}=props
     if(usuario_id && tarea_id){
      const tarea=tareas[usuario_id][tarea_id]
      cambioUsuarioId(tarea.userId)
      cambioTitulo(tarea.title)
     }else{
      limpiarDatos()
     }
  }, [])
  

const cambioUsuarioId=(event)=>{
  props.cambioUsuarioId(event.target.value)
}
const cambioTitulo=(event)=>{
    props.cambioTitulo(event.target.value)
}
const handleClick=()=>{
    const{usuario_id,titulo,agregar,tareas,editar}=props;
    const nueva_tarea={
        userId:usuario_id,
        title:titulo,
        completed:false
    };
    if(usuario_id && tarea_id){
      const tarea=tareas[usuario_id][tarea_id]
      const tarea_editada={
        ...nueva_tarea,
        completed:tarea.completed,
        id:tarea.id
      }
      editar(tarea_editada)
    }
    else{
      agregar(nueva_tarea)
    }
    
    
}
 const deshabilitar=()=>{
    const{usuario_id,titulo,cargando}=props
    if(cargando|| !usuario_id || !titulo){
        return true
    }
    return false
 }
  return (
    <>
    {props.regresar && navigate('/tareas')}
    {props.cargando && <Loader/>}
    {props.error!==''&& <Error message={props.error}/>}
    <div className='Guardar'>
        <h1>Guardar tarea</h1>
        <label htmlFor="usuario">Usuario id:</label>
        <input type="number" id="usuario" value={props.usuario_id} onChange={cambioUsuarioId}/>
        <label htmlFor="titulo">Título</label>
        <input type="text"  id="titulo" value={props.titulo} onChange={cambioTitulo} />
        <button onClick={handleClick} disabled={deshabilitar()}>Guardar</button>
    </div>
    </>
  )
}
//me traigo el estado que voy a consumir y lo conecto con el componente
const mapStateToProps=({tareasReducer})=>{
return tareasReducer
}
export default connect(mapStateToProps,tareasActions) (Guardar)