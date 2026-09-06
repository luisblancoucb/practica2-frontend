import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { eliminarCita, obtenerDatos } from '../services/apiService.js'
import { esAdministrador } from '../utils/sesion.js'
import './Citas.css'

function Citas() {
  const [citas, setCitas] = useState([])
  const [mensajeError, setMensajeError] = useState('')
  const administrador = esAdministrador()

  useEffect(() => {
    async function cargarCitas() {
      try {
        const citasApi = await obtenerDatos('/citas')
        setCitas(citasApi)
      } catch (error) {
        setMensajeError(error.message)
      }
    }

    cargarCitas()
  }, [])

  async function handleEliminar(cita) {
    const confirmar = window.confirm(
      `¿Deseas eliminar la cita ${cita.codigo}?`,
    )

    if (!confirmar) {
      return
    }

    try {
      await eliminarCita(cita.id)
      setCitas(citas.filter((item) => item.id !== cita.id))
    } catch (error) {
      setMensajeError(error.message)
    }
  }

  return (
    <main className="dashboard-principal">
      <section className="panel listado-seccion">
        <header className="encabezado-pagina">
          <h2>Citas</h2>
          {administrador && (
            <Link className="boton boton-pequeno" to="/citas/nuevo">
              Crear cita
            </Link>
          )}
        </header>

        {mensajeError && (
        <p className="mensaje-error" role="alert">
          {mensajeError}
        </p>
        )}

        <div className="tabla-contenedor">
          <table>
            <caption>Listado de citas</caption>
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Fecha y hora</th>
                <th scope="col">Cliente</th>
                <th scope="col">Mascota</th>
                <th scope="col">Servicio</th>
                <th scope="col">Estado</th>
                {administrador && <th scope="col">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.codigo}</td>
                  <td>{new Date(cita.fechaHora).toLocaleString()}</td>
                  <td>{cita.clienteNombre}</td>
                  <td>{cita.nombreMascota}</td>
                  <td>{cita.servicioNombre}</td>
                  <td>{cita.estado}</td>
                  {administrador && (
                    <td className="acciones">
                      <Link className="accion" to={`/citas/${cita.id}/editar`}>
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="accion accion-eliminar"
                        onClick={() => handleEliminar(cita)}
                      >
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default Citas