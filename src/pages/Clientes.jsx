import { useEffect, useState } from 'react'
import { eliminarCliente, obtenerDatos } from '../services/apiService.js'
import { Link } from 'react-router-dom'
import { esAdministrador } from '../utils/sesion.js'
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
    
  async function handleEliminar(cliente) {
    const confirmar = window.confirm(
      `¿Deseas eliminar a ${cliente.nombreCompleto}?`,
    )
  
    if (!confirmar) {
      return
    }
  
    try {
      await eliminarCliente(cliente.id)
      setClientes(clientes.filter((item) => item.id !== cliente.id))
    } catch (error) {
      setMensajeError(error.message)
    }
  }
  
  const administrador = esAdministrador()
  
  return (
    <main className="dashboard-principal">
      <section className="panel listado-seccion">
        <header className="encabezado-pagina">
            <h2>Clientes</h2>
            {administrador && (
              <Link className="boton boton-pequeno" to="/clientes/nuevo">
                Crear cliente
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
            <caption>Listado de clientes</caption>
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Cliente</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Correo</th>
                <th scope="col">Mascota</th>
                <th scope="col">Tipo</th>
                {administrador && <th scope="col">Acciones</th>}
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
                  {administrador && (
                    <td className="acciones">
                      <Link className="accion" to={`/clientes/${cliente.id}/editar`}>
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="accion accion-eliminar"
                        onClick={() => handleEliminar(cliente)}
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

export default Clientes