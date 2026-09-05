const API_URL = import.meta.env.VITE_API_URL

export async function obtenerDatos(ruta) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: {
      Authorization: `Bearer ${sesion?.token ?? ''}`,
    },
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible obtener los datos.')
  }

  return respuesta.json()
}