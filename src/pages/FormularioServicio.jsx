import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  actualizarServicio,
  crearServicio,
  obtenerDatos,
} from '../services/apiService.js'
import './FormularioServicio.css'

const servicioInicial = {
  nombre: '',
  descripcion: '',
  precio: '',
  duracionMinutos: '',
  activo: true,
}

function FormularioServicio() {
  const [servicio, setServicio] = useState(servicioInicial)
  const [mensajeError, setMensajeError] = useState('')
  const navegar = useNavigate()
  const { id } = useParams()
  const esEdicion = Boolean(id)

  useEffect(() => {
    async function cargarServicio() {
      if (!esEdicion) {
        return
      }

      try {
        const servicioApi = await obtenerDatos(`/servicios/${id}`)
        setServicio({
          nombre: servicioApi.nombre,
          descripcion: servicioApi.descripcion,
          precio: servicioApi.precio,
          duracionMinutos: servicioApi.duracionMinutos,
          activo: servicioApi.activo,
        })
      } catch (error) {
        setMensajeError(error.message)
      }
    }

    cargarServicio()
  }, [esEdicion, id])

  function handleChange(event) {
    const { name, value, checked, type } = event.target

    setServicio({
      ...servicio,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMensajeError('')

    const datosServicio = {
      ...servicio,
      precio: Number(servicio.precio),
      duracionMinutos: Number(servicio.duracionMinutos),
    }

    try {
      if (esEdicion) {
        await actualizarServicio(id, datosServicio)
      } else {
        await crearServicio(datosServicio)
      }

      navegar('/servicios')
    } catch (error) {
      setMensajeError(error.message)
    }
  }

  return (
    <main className="dashboard-principal">
      <section className="panel formulario-seccion">
        <header className="encabezado-pagina">
          <div>
            <h2>{esEdicion ? 'Editar servicio' : 'Formulario de servicio'}</h2>
            <p>
              {esEdicion
                ? 'Modifica los datos del servicio.'
                : 'Registra un nuevo servicio.'}
            </p>
          </div>

          <Link className="boton boton-pequeno" to="/servicios">
            Volver a servicios
          </Link>
        </header>

        <form className="formulario-datos" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Datos del servicio</legend>

            <div className="campo">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                value={servicio.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={servicio.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="precio">Precio</label>
              <input
                id="precio"
                name="precio"
                type="number"
                min="0.01"
                step="0.01"
                value={servicio.precio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="duracionMinutos">Duración en minutos</label>
              <input
                id="duracionMinutos"
                name="duracionMinutos"
                type="number"
                min="1"
                step="1"
                value={servicio.duracionMinutos}
                onChange={handleChange}
                required
              />
            </div>

            <label className="campo-checkbox" htmlFor="activo">
              <input
                id="activo"
                name="activo"
                type="checkbox"
                checked={servicio.activo}
                onChange={handleChange}
              />
              Servicio activo
            </label>

            {mensajeError && (
             <p className="mensaje-error" role="alert">
               {mensajeError}
             </p>
            )}

            <button className="boton" type="submit">
              {esEdicion ? 'Actualizar servicio' : 'Guardar servicio'}
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default FormularioServicio