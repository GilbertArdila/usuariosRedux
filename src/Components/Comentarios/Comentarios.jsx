import React from 'react'
import { connect } from 'react-redux'
import { Loader } from '../Loader/Loader'

const Comentarios = (props) => {
    return (
        <>
        {props.publicacionesReducer.cargando_comentarios && <Loader/>}
        {props.publicacionesReducer.comentarios_error!=='' && <h2>Ha ocurrido un error!</h2>} 
        {!props.comentarios.length && <h1>No tenemos comentarios aún!</h1>}
        {props.comentarios.length && props.comentarios.map((comentario)=>(
            <div className='Comentarios' key={comentario.id}>
                
            <span><b>name:{' '}</b> {comentario.name}</span>
            <span><b><u>email:{' '}{comentario.email}</u></b></span>
            <span><b>comentario:{' '}</b> {comentario.body}</span>
        
            </div>
            
        ))}
       
        </>
        
    )
}
const mapStateToProps=({publicacionesReducer})=>{
    return {publicacionesReducer}
}
export default connect(mapStateToProps) (Comentarios )