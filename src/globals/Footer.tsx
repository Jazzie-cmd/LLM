import React from 'react'

function Footer() {
  return (
    <footer className="flex flex-row justify-center bottom-0 w-full pb-4">
        <div className="text-left">
        <p className= "text-sm font-arimo text-gray-400">
            Extract - Automatically extract an opened email</p>
        <p className= "text-sm font-arimo text-gray-400">
            Manual - Enable manual input for the email</p>
        <p className= "text-sm font-arimo text-gray-400">
        Check Email - Check the email for potential threat</p>
        </div>

    </footer>
  )
}

export default Footer