import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import * as tareasActions from '../../actions/tareasActions';

const Tareas = (props) => {
  const { tareas, cargando, error,cambioCheck,eliminarTarea } = props;

  useEffect(() => {
    if(!Object.keys(props.tareas).length){
       props.traerTodas()
    }
   
  }, [tareas])



  return (

    <>
      {cargando && <Loader />}
      {error!=='' && <Error message={error}/>}
      <button className='Tareas-agregar'><Link to={'/tareas/agregar'}>Agregar</Link></button>

      {
        Object.keys(tareas).map((usuario_id) => (
          <div className='Tareas' key={usuario_id}>
            <p className='Tareas-usuario'>Usuario:{' '}{usuario_id}</p>
            <div className='Tareas-TareaContainer'>
              {ponerTareas(usuario_id, tareas,cambioCheck,eliminarTarea)}
            </div>
          </div>
        ))
      }
    </>
  )
}
const ponerTareas = (usuario_id, tareas,cambioCheck,eliminarTarea) => {
  const por_usuario = {
    ...tareas[usuario_id]
  };
  return Object.keys(por_usuario).map((tarea_id) => (
    <div className='checkbox-container' key={tarea_id}>

      <button className='btn'><Link to={`/tareas/agregar/${usuario_id}/${tarea_id}`}>Editar</Link></button>

      <button className='btn' onClick={()=>eliminarTarea(tarea_id)}>Eliminar</button>

      <input 
      type="checkbox" 
      defaultChecked={por_usuario[tarea_id].completed} key={tarea_id} 
      className='tarea-checkbox' 
      onChange={()=>cambioCheck(usuario_id,tarea_id)}
      />
      <span className='checkbox-title'>{por_usuario[tarea_id].title}</span>
      
      
    </div>
  ))
}

const mapStateToProps = ({ tareasReducer }) => {
  return tareasReducer
}

export default connect(mapStateToProps, tareasActions)(Tareas)