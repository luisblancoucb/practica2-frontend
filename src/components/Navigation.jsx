import { NavLink, useNavigate } from 'react-router-dom'

function Navigation() {
  const navegar = useNavigate()

  function claseEnlace({ isActive }) {
    return isActive ? 'menu-activo' : ''
  }

  function cerrarSesion() {
    sessionStorage.removeItem('sesion')
    navegar('/login')
  }

  return (
    <nav className="menu" aria-label="Navegación principal">
      <NavLink to="/dashboard" className={claseEnlace}>
        Inicio
      </NavLink>
      <NavLink to="/clientes" className={claseEnlace}>
        Clientes
      </NavLink>
      <NavLink to="/servicios" className={claseEnlace}>
        Servicios
      </NavLink>
      <NavLink to="/citas" className={claseEnlace}>
        Citas
      </NavLink>
      <button type="button" className="menu-salir" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </nav>
  )
}

export default Navigation