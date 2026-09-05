import { NavLink } from 'react-router-dom'

function Navigation() {
  function claseEnlace({ isActive }) {
    return isActive ? 'menu-activo' : ''
  }

  return (
    <nav className="menu" aria-label="Navegación principal">
      <NavLink to="/dashboard" className={claseEnlace}>
        Inicio
      </NavLink>
      <NavLink to="/clientes" className={claseEnlace}>
        Clientes
      </NavLink>
    </nav>
  )
}

export default Navigation