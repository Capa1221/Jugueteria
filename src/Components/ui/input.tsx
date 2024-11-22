// src/components/ui/input.tsx
import React from 'react'

interface InputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const Input: React.FC<InputProps> = ({ type = 'text', placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  )
}
