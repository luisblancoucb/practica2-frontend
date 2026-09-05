import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import Clientes from './pages/Clientes.jsx'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
        <>
          <Header />
          <Navigation />
          <Dashboard />
          <Footer />
        </>
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
    </Routes>
  )
}

export default App