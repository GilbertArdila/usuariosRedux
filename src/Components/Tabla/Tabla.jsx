import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Styles.css'

const Tabla = (props) => {
	return (
		<table className="Table-container">
			<thead>
				<tr>
					<th>
						Nombre
					</th>
					<th>
						Correo
					</th>
					<th>
						Web
					</th>
					<th>
						Telefono
					</th>
					<th>
						Empresa
					</th>
					<th>
						
					</th>

				</tr>
			</thead>
			<tbody>
				{props.usuarios.map((usuario, key) => (
					
					<tr key={usuario.id}>
						<td data-titulo='Nombre'>{usuario.name}</td>
						<td data-titulo='Email'>{usuario.email}</td>
						<td data-titulo='Sitio web'>{usuario.website}</td>
						<td data-titulo='Teléfono'>{usuario.phone}</td>
						<td data-titulo='Compañia'>{usuario.company.name}</td>
						<td data-titulo='Link' ><Link className='link' to={`/publicaciones/${key}`}><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-eye-64.png" alt="ver" /></Link></td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

//conectamos al estado y consumimos el UsuariosReducer
const mapStateToProps = (reducers) => {
	return reducers.UsuariosReducer
}
export default connect(mapStateToProps)(Tabla)