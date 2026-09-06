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

export async function actualizarCliente(id, cliente) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
    body: JSON.stringify(cliente),
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible actualizar el cliente.')
  }
}


export async function eliminarCliente(id) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible eliminar el cliente.')
  }
}

export async function crearServicio(servicio) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}/servicios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
    body: JSON.stringify(servicio),
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible guardar el servicio.')
  }

  return respuesta.json()
}

export async function actualizarServicio(id, servicio) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}/servicios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
    body: JSON.stringify(servicio),
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible actualizar el servicio.')
  }
}

export async function eliminarServicio(id) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}/servicios/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible eliminar el servicio.')
  }
}

export async function crearCita(cita) {
  const sesion = JSON.parse(sessionStorage.getItem('sesion'))

  const respuesta = await fetch(`${API_URL}/citas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sesion.token}`,
    },
    body: JSON.stringify(cita),
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible guardar la cita.')
  }

  return respuesta.json()
}

export async function actualizarCita(id, cita) {
  const sesion = JSON.parse(sessionStorage.getItem('sesion'))

  const respuesta = await fetch(`${API_URL}/citas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sesion.token}`,
    },
    body: JSON.stringify(cita),
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible actualizar la cita.')
  }
}

export async function eliminarCita(id) {
  const sesion = JSON.parse(sessionStorage.getItem('sesion'))

  const respuesta = await fetch(`${API_URL}/citas/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sesion.token}`,
    },
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible eliminar la cita.')
  }
}