import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import * as tareasActions from '../../actions/tareasActions';
import './Styles.css'

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
      <button className='btn agregar'><Link to={'/tareas/agregar'}>Agregar tarea</Link></button>

      {
        Object.keys(tareas).map((usuario_id) => (
         
          <div className='Tareas' key={usuario_id}>   
            <p className='Tareas-usuario'>Tareas usuario:{' '}{usuario_id}</p>
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

     

      <input 
      type="checkbox" 
      defaultChecked={por_usuario[tarea_id].completed} key={tarea_id} 
      className='tarea-checkbox' 
      onChange={()=>cambioCheck(usuario_id,tarea_id)}
      />
      <span className='checkbox-title'>{por_usuario[tarea_id].title}</span>

      <button className='btn editar'><Link to={`/tareas/agregar/${usuario_id}/${tarea_id}`}> 🖊</Link></button>

<button className='btn borrar' onClick={()=>eliminarTarea(tarea_id)}>🗑</button>
      
      
    </div>
  ))
}

const mapStateToProps = ({ tareasReducer }) => {
  return tareasReducer
}

export default connect(mapStateToProps, tareasActions)(Tareas)