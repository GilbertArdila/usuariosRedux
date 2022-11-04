import{combineReducers}from 'redux'
import UsuariosReducer  from './UsuariosReducer'
import publicacionesReducer from './publicacionesReducer'
import tareasReducer from './tareasReducer'

export default combineReducers({
  UsuariosReducer,
  publicacionesReducer,
  tareasReducer
})