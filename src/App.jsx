import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminRoute from './components/AdminRoute.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Clientes from './pages/Clientes.jsx'
import Citas from './pages/Citas.jsx'
import Dashboard from './pages/Dashboard.jsx'
import FormularioCita from './pages/FormularioCita.jsx'
import FormularioCliente from './pages/FormularioCliente.jsx'
import FormularioServicio from './pages/FormularioServicio.jsx'
import Login from './pages/Login.jsx'
import Servicios from './pages/Servicios.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Header />
            <Navigation />
            <Dashboard />
            <Footer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <Header />
            <Navigation />
            <Clientes />
            <Footer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes/nuevo"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Header />
              <Navigation />
              <FormularioCliente />
              <Footer />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes/:id/editar"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Header />
              <Navigation />
              <FormularioCliente />
              <Footer />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/servicios"
        element={
          <ProtectedRoute>
            <Header />
            <Navigation />
            <Servicios />
            <Footer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/servicios/nuevo"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Header />
              <Navigation />
              <FormularioServicio />
              <Footer />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/servicios/:id/editar"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Header />
              <Navigation />
              <FormularioServicio />
              <Footer />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/citas"
        element={
          <ProtectedRoute>
            <Header />
            <Navigation />
            <Citas />
            <Footer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/citas/nuevo"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Header />
              <Navigation />
              <FormularioCita />
              <Footer />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citas/:id/editar"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Header />
              <Navigation />
              <FormularioCita />
              <Footer />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App