// Layout.jsx
import RoleNavbar from "./Navbar/RoleNavbar"; 
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <RoleNavbar />
      <main className="min-h-screen bg-white">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
