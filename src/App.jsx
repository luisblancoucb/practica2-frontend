import './App.css'

function App() {
  return (
    <>
      <header className="encabezado">
        <div className="contenedor">
          <h1>Patitas Pet Shop</h1>
          <p>Panel administrativo</p>
        </div>
      </header>

      <nav className="menu" aria-label="Navegación principal">
        <a className="menu-activo" href="#inicio" aria-current="page">
          Inicio
        </a>
        <a href="#clientes">Clientes</a>
        <a href="#servicios">Servicios</a>
        <a href="#citas">Citas</a>
        <a href="#salir">Cerrar sesión</a>
      </nav>

      <main className="contenedor">

      </main>

      <footer className="pie-pagina">
        <p>Maestría en Ingeniería de Software</p>
      </footer>
    </>
  )
}

export default App