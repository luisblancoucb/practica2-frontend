import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const sesionGuardada = sessionStorage.getItem('sesion')
  const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null

  if (!sesion?.token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute