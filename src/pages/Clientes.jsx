import { useEffect, useState } from 'react'
import { obtenerDatos } from '../services/apiService.js'
import './Clientes.css'

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [mensajeError, setMensajeError] = useState('')

  useEffect(() => {
    async function cargarClientes() {
      try {
        const clientesApi = await obtenerDatos('/clientes')
        setClientes(clientesApi)
      } catch (error) {
        setMensajeError(error.message)
      }
    }

    cargarClientes()
  }, [])

  return (
    <main className="dashboard-principal">
      <section className="panel listado-seccion">
        <header className="encabezado-pagina">
          <h2>Clientes</h2>
        </header>

        {mensajeError && <p role="alert">{mensajeError}</p>}

        <div className="tabla-contenedor">
          <table>
            <caption>Listado de clientes</caption>
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Cliente</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Correo</th>
                <th scope="col">Mascota</th>
                <th scope="col">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.codigo}</td>
                  <td>{cliente.nombreCompleto}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.nombreMascota}</td>
                  <td>{cliente.tipoMascota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default Clientes