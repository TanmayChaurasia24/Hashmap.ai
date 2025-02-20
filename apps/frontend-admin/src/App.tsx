"use client"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/Login'
import SidebarDemo  from './pages/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<SidebarDemo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App