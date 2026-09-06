import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null
  const expiracion = sesion ? new Date(sesion.expiracion) : null

  const sesionValida =
    sesion?.token &&
    expiracion &&
    !Number.isNaN(expiracion.getTime()) &&
    expiracion > new Date()

  if (!sesionValida) {
    sessionStorage.removeItem('sesion')
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute