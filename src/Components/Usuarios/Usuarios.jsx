import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions'
import  Tabla  from '../Tabla/Tabla';
import { Loader } from '../Loader/Loader';
import {Error} from '../Error/Error'

const Usuarios =(props)=> {

	useEffect(() => {
		if(!props.usuarios.length){
		   props.traerTodos()
		   
		}
	   }, [])

  
	if(props.cargando){
		return(
			
			 <Loader/>
		)
	}
	if(props.error!==''){
		return(
			<Error message={props.error}/>
		)
	}
	if(!props.cargando && props.error===''){
		return (
			
			<div>
				<h1 className='Title'>Usuarios</h1>
				<Tabla/>
			</div>
		)
	}
		
	
};

const mapStateToProps = (reducers) => {
	return reducers.UsuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);