import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { Nav } from '../Components'
import Tareas from '../Components/Tareas/Tareas'
import Publicaciones from '../Components/Publicaciones';
import Usuarios from '../Components/Usuarios/Usuarios'
import Guardar from '../Components/Guardar/Guardar';


const AppNavigation = () => {
  return (
    <BrowserRouter>
     <Nav/>
     <Routes>
       <Route path='/' element={<Usuarios/>}/>
       <Route path='/tareas' element={<Tareas/>}/>
       <Route path='/publicaciones/:key' element={<Publicaciones/>}/>
       <Route path='/tareas/agregar' element={<Guardar/>}/>
       <Route  path='/tareas/agregar/:usuario_id/:tarea_id' element={<Guardar/>}/>
     </Routes>
    
    </BrowserRouter>
  )
}

export  {AppNavigation}