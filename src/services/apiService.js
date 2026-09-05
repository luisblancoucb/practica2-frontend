const API_URL = import.meta.env.VITE_API_URL

export async function obtenerDatos(ruta) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: {
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
  })

  if (respuesta.status === 401) {
    sessionStorage.removeItem('sesion')
    window.location.assign('/login')
    return
  }


  if (!respuesta.ok) {
    throw new Error('No fue posible obtener los datos.')
  }

  return respuesta.json()
}

export async function crearCliente(cliente) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
    body: JSON.stringify(cliente),
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible guardar el cliente.')
  }

  return respuesta.json()
}
