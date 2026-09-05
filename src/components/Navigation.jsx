function Navigation() {
  return (
    <nav className="menu" aria-label="Navegación principal">
      <a className="menu-activo" href="#inicio" aria-current="page">
        Inicio
      </a>
      <a href="#clientes">Clientes</a>
      <a href="#servicios">Servicios</a>
      <a href="#citas">Citas</a>
      <a href="#salir">Cerrar sesión</a>
    </nav>
  )
}

export default Navigation