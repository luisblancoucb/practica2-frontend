import './Login.css'

function Login() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <>
      <main>
        <section className="login">
          <header className="login-encabezado">
            <h1>Patitas Pet Shop</h1>
            <p>Inicia sesión para continuar.</p>
          </header>

          <form id="formulario-login" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos de acceso</legend>

              <div className="campo">
                <label htmlFor="correo">Correo electrónico</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  placeholder="ejemplo@correo.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="contrasena">Contraseña</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  placeholder="Escribe tu contraseña"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button className="boton" type="submit">
                Ingresar
              </button>
            </fieldset>
          </form>
        </section>
      </main>

      <footer>
        <p>Maestría en Ingeniería de Software Avanzada</p>
      </footer>
    </>
  )
}

export default Login