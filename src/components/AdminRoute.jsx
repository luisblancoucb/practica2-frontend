import { Navigate } from 'react-router-dom'
import { esAdministrador } from '../utils/sesion.js'

function AdminRoute({ children }) {
  if (!esAdministrador()) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default AdminRoute