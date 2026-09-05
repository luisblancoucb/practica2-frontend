import { useState } from 'react'
import { iniciarSesion } from '../services/authService.js'
import './Login.css'

function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensajeError, setMensajeError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMensajeError('')
    setMensajeExito('')
    setCargando(true)

    try {
      const sesion = await iniciarSesion(correo, contrasena)

      sessionStorage.setItem('sesion', JSON.stringify(sesion))
      setMensajeExito('Sesión iniciada correctamente.')
    } catch (error) {
      setMensajeError(error.message)
    } finally {
      setCargando(false)
    }
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
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
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
                  minLength="8"
                  value={contrasena}
                  onChange={(event) => setContrasena(event.target.value)}
                  required
                />
              </div>

              {mensajeError && (
                <p className="mensaje-error" role="alert">
                  {mensajeError}
                </p>
              )}

              {mensajeExito && (
                <p className="mensaje-exito" role="status">
                  {mensajeExito}
                </p>
              )}

              <button className="boton" type="submit" disabled={cargando}>
                {cargando ? 'Ingresando...' : 'Ingresar'}
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