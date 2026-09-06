import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  actualizarCita,
  crearCita,
  obtenerDatos,
} from '../services/apiService.js'
import './FormularioCita.css'

const citaInicial = {
  fechaHora: '',
  estado: 'Pendiente',
  clienteId: '',
  servicioId: '',
}

function FormularioCita() {
  const [cita, setCita] = useState(citaInicial)
  const [clientes, setClientes] = useState([])
  const [servicios, setServicios] = useState([])
  const [mensajeError, setMensajeError] = useState('')
  const navegar = useNavigate()
  const { id } = useParams()
  const esEdicion = Boolean(id)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [clientesApi, serviciosApi] = await Promise.all([
          obtenerDatos('/clientes'),
          obtenerDatos('/servicios'),
        ])

        setClientes(clientesApi)
        setServicios(serviciosApi.filter((servicio) => servicio.activo))

        if (esEdicion) {
          const citaApi = await obtenerDatos(`/citas/${id}`)
          setCita({
            fechaHora: citaApi.fechaHora.slice(0, 16),
            estado: citaApi.estado,
            clienteId: String(citaApi.clienteId),
            servicioId: String(citaApi.servicioId),
          })
        }
      } catch (error) {
        setMensajeError(error.message)
      }
    }

    cargarDatos()
  }, [esEdicion, id])

  function handleChange(event) {
    const { name, value } = event.target
    setCita({
      ...cita,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMensajeError('')

    const datosCita = {
      ...cita,
      clienteId: Number(cita.clienteId),
      servicioId: Number(cita.servicioId),
    }

    try {
      if (esEdicion) {
        await actualizarCita(id, datosCita)
      } else {
        await crearCita(datosCita)
      }

      navegar('/citas')
    } catch (error) {
      setMensajeError(error.message)
    }
  }

  return (
    <main className="dashboard-principal">
      <section className="panel formulario-seccion">
        <header className="encabezado-pagina">
          <div>
            <h2>{esEdicion ? 'Editar cita' : 'Formulario de cita'}</h2>
            <p>
              {esEdicion
                ? 'Modifica los datos de la cita.'
                : 'Registra una nueva cita.'}
            </p>
          </div>

          <Link className="boton boton-pequeno" to="/citas">
            Volver a citas
          </Link>
        </header>

        <form className="formulario-datos" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Datos de la cita</legend>

            <div className="campo">
              <label htmlFor="fechaHora">Fecha y hora</label>
              <input
                id="fechaHora"
                name="fechaHora"
                type="datetime-local"
                value={cita.fechaHora}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="clienteId">Cliente</label>
              <select
                id="clienteId"
                name="clienteId"
                value={cita.clienteId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombreCompleto} - {cliente.nombreMascota}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="servicioId">Servicio</label>
              <select
                id="servicioId"
                name="servicioId"
                value={cita.servicioId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={cita.estado}
                onChange={handleChange}
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            {mensajeError && (
             <p className="mensaje-error" role="alert">
               {mensajeError}
             </p>
            )}

            <button className="boton" type="submit">
              {esEdicion ? 'Actualizar cita' : 'Guardar cita'}
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default FormularioCita