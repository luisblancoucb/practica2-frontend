import { useEffect, useState } from 'react'
import { obtenerDatos } from '../services/apiService.js'
import './Dashboard.css'

function Dashboard() {
  const [clientes, setClientes] = useState([])
  const [servicios, setServicios] = useState([])
  const [citas, setCitas] = useState([])
  const [mensajeError, setMensajeError] = useState('')

  useEffect(() => {
    async function cargarResumen() {
      try {
        const [clientesApi, serviciosApi, citasApi] = await Promise.all([
          obtenerDatos('/clientes'),
          obtenerDatos('/servicios'),
          obtenerDatos('/citas'),
        ])

        setClientes(clientesApi)
        setServicios(serviciosApi)
        setCitas(citasApi)
      } catch (error) {
        setMensajeError(error.message)
      }
    }

    cargarResumen()
  }, [])

  const fechaHoy = new Date().toLocaleDateString('en-CA')
  const citasDeHoy = citas.filter(
    (cita) =>
      new Date(cita.fechaHora).toLocaleDateString('en-CA') === fechaHoy,
  )

  return (
    <main className="dashboard-principal">
      <section className="panel bienvenida">
        <h2>Bienvenido al panel administrativo</h2>
      </section>

      {mensajeError && <p role="alert">{mensajeError}</p>}

      <section className="resumen">
        <h2>Resumen general</h2>

        <div className="tarjetas">
          <article className="panel tarjeta">
            <h3>Clientes</h3>
            <p>{clientes.length}</p>
          </article>

          <article className="panel tarjeta">
            <h3>Servicios</h3>
            <p>{servicios.length}</p>
          </article>

          <article className="panel tarjeta">
            <h3>Citas de hoy</h3>
            <p>{citasDeHoy.length}</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Dashboard