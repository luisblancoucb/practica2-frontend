const API_URL = import.meta.env.VITE_API_URL

export async function iniciarSesion(correo, contrasena) {
  const respuesta = await fetch(`${API_URL}/autenticacion/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      correo,
      contrasena,
    }),
  })

  if (respuesta.status === 401) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  if (!respuesta.ok) {
    throw new Error('No fue posible iniciar sesión.')
  }

  return respuesta.json()
}