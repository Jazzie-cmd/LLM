import React from 'react'
import { useNavigate } from "react-router-dom"
import Logo from 'data-base64:~assets/mail-logo.png'
function Header() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-row justify-end w-full z-50 shadow-slate-300 shadow-md p-2">
      <button onClick={() => navigate("/")} className="relative flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 hover:rotate-3">
        <img src={Logo} alt="click to home" className="w-10 h-10" />
      </button>
    </div>
  )
}

export default Header