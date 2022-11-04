import React from 'react'
import { Link } from 'react-router-dom'
import './Styles.css'

const Nav = () => {
  return (
    <nav className='Nav'>
        <Link to={'/'}>Usuarios</Link>
        <Link to={'/tareas'}>Tareas</Link>
    </nav>
  )
}

export  {Nav}