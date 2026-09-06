export function obtenerSesion() {
  const sesionGuardada = sessionStorage.getItem('sesion')
  return sesionGuardada ? JSON.parse(sesionGuardada) : null
}

export function esAdministrador() {
  const sesion = obtenerSesion()
  return sesion?.rol === 'Administrador'
}