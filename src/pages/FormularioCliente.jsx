import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { actualizarCliente, crearCliente, obtenerDatos, } from '../services/apiService.js'
import './FormularioCliente.css'

const clienteInicial = {
  nombreCompleto: '',
  telefono: '',
  correo: '',
  nombreMascota: '',
  tipoMascota: '',
}

function FormularioCliente() {
  const [cliente, setCliente] = useState(clienteInicial)
  const [mensajeError, setMensajeError] = useState('')
  const navegar = useNavigate()

  const { id } = useParams()
  const esEdicion = Boolean(id)

  useEffect(() => {
    async function cargarCliente() {
      if (!esEdicion) {
        return
      }
      try {
        const clienteApi = await obtenerDatos(`/clientes/${id}`)
        setCliente({
          nombreCompleto: clienteApi.nombreCompleto,
          telefono: clienteApi.telefono,
          correo: clienteApi.correo,
          nombreMascota: clienteApi.nombreMascota,
          tipoMascota: clienteApi.tipoMascota,
        })
      } catch (error) {
        setMensajeError(error.message)
      }
    }
    cargarCliente()
  }, [esEdicion, id])

  function handleChange(event) {
    const { name, value } = event.target

    setCliente({
      ...cliente,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMensajeError('')
    try {
        if (esEdicion) {
        await actualizarCliente(id, cliente)
        } else {
        await crearCliente(cliente)
        }
        navegar('/clientes')
    } catch (error) {
        setMensajeError(error.message)
    }
  }

  return (
    <main className="dashboard-principal">
      <section className="panel formulario-seccion">
        <header className="encabezado-pagina">
        <div>
            <h2>{esEdicion ? 'Editar cliente' : 'Formulario de cliente'}</h2>
            <p>
            {esEdicion
                ? 'Modifica los datos del cliente y su mascota.'
                : 'Registra un cliente y su mascota.'}
            </p>
        </div>

        <Link className="boton boton-pequeno" to="/clientes">
            Volver a clientes
        </Link>
        </header>

        <form className="formulario-datos" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Datos del cliente y su mascota</legend>

            <div className="campo">
              <label htmlFor="nombreCompleto">Nombre completo</label>
              <input
                id="nombreCompleto"
                name="nombreCompleto"
                value={cliente.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                name="telefono"
                value={cliente.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="correoCliente">Correo electrónico</label>
              <input
                id="correoCliente"
                name="correo"
                type="email"
                value={cliente.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="nombreMascota">Nombre de la mascota</label>
              <input
                id="nombreMascota"
                name="nombreMascota"
                value={cliente.nombreMascota}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="tipoMascota">Tipo de mascota</label>
              <select
                id="tipoMascota"
                name="tipoMascota"
                value={cliente.tipoMascota}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Pez">Pez</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {mensajeError && (
             <p className="mensaje-error" role="alert">
               {mensajeError}
             </p>
            )}

            <button className="boton" type="submit">
                {esEdicion ? 'Actualizar cliente' : 'Guardar cliente'}
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default FormularioCliente