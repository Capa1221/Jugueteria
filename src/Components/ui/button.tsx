// src/components/ui/button.tsx
import React from 'react'

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-white-500 text-white hover:bg-blue-600 focus:outline-none ${className}`}
    >
      {children}
    </button>
  )
}
