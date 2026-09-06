import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { eliminarServicio, obtenerDatos } from '../services/apiService.js'
import { esAdministrador } from '../utils/sesion.js'
import './Servicios.css'

function Servicios() {
  const [servicios, setServicios] = useState([])
  const [mensajeError, setMensajeError] = useState('')
  const administrador = esAdministrador()

  useEffect(() => {
    async function cargarServicios() {
      try {
        const serviciosApi = await obtenerDatos('/servicios')
        setServicios(serviciosApi)
      } catch (error) {
        setMensajeError(error.message)
      }
    }

    cargarServicios()
  }, [])

  async function handleEliminar(servicio) {
    const confirmar = window.confirm(
      `¿Deseas eliminar el servicio ${servicio.nombre}?`,
    )

    if (!confirmar) {
      return
    }

    try {
      await eliminarServicio(servicio.id)
      setServicios(servicios.filter((item) => item.id !== servicio.id))
    } catch (error) {
      setMensajeError(error.message)
    }
  }

  return (
    <main className="dashboard-principal">
      <section className="panel listado-seccion">
        <header className="encabezado-pagina">
          <h2>Servicios</h2>
          {administrador && (
            <Link className="boton boton-pequeno" to="/servicios/nuevo">
              Crear servicio
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
            <caption>Listado de servicios</caption>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Duración</th>
                <th scope="col">Activo</th>
                {administrador && <th scope="col">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.descripcion}</td>
                  <td>{servicio.precio}</td>
                  <td>{servicio.duracionMinutos} min</td>
                  <td>{servicio.activo ? 'Sí' : 'No'}</td>
                  {administrador && (
                    <td className="acciones">
                      <Link
                        className="accion"
                        to={`/servicios/${servicio.id}/editar`}
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="accion accion-eliminar"
                        onClick={() => handleEliminar(servicio)}
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

export default Servicios