import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loader } from '../Loader/Loader'
import { Error } from '../Error/Error'
import Comentarios  from '../Comentarios/Comentarios'
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'


const{abrirCerrar,traerComentarios}=publicacionesActions

const Publicaciones = (props) => {
  const { key } = useParams()

  useEffect(() => {
    if (!props.UsuariosReducer.usuarios.length) {
      props.traerTodos()

    } else {
      if (!('publicaciones_key' in props.UsuariosReducer.usuarios[key])) {
        props.traerPorUsuario(key)
      }

    }

  }, [])

const handleOnClick=(id,key,comnetarios)=>{
  props.abrirCerrar(id,key)
  if(!comnetarios.length){
    props.traerComentarios(key)
  }
  
}

  const { publicaciones } = props.publicacionesReducer

  return (
    <>
    <h1 className='Publicaciones'>Públicaciones de:{' '}{props.UsuariosReducer.usuarios[key].name}</h1>
      {props.publicacionesReducer.cargando && <Loader />}
      {props.publicacionesReducer.error !== '' && <Error message={props.publicacionesReducer.error} />}
      {(!props.publicacionesReducer.cargando && publicaciones.length>0) &&
        <>
          
          {publicaciones.map((publicacion) => (
            publicacion.map((pub,key) => (
              
              <div className='Publicaciones-container' key={pub.id} onClick={()=>handleOnClick(pub.id,key,pub.comnetarios)}>
                <h3 className=''>{pub.title}</h3>
                <span className='Publicaciones-container_body'>{pub.body}</span>
                {pub.abierto?<Comentarios comentarios={pub.comnetarios}/>:''}
              </div>
              
            ))


          ))}
        </>

      }

    </>

  )
}

const mapStateToProps = ({ UsuariosReducer, publicacionesReducer }) => {
  return { UsuariosReducer, publicacionesReducer };
};
const mapDispatchToProps = {
  ...usuariosActions,
  ...publicacionesActions,
     abrirCerrar,
     traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)