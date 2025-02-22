// import React from 'react'
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="flex flex-row text-3xl ">
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </nav>
  )
}
