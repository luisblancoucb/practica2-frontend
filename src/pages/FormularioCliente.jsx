import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { crearCliente } from '../services/apiService.js'
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
      await crearCliente(cliente)
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
            <h2>Formulario de cliente</h2>
            <p>Registra un cliente y su mascota.</p>
          </div>
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

            {mensajeError && <p role="alert">{mensajeError}</p>}

            <button className="boton" type="submit">
              Guardar cliente
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default FormularioCliente