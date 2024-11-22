// src/components/ui/dialog.tsx
import React from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={() => onOpenChange(false)}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}

interface DialogTriggerProps {
    onClick: () => void;
    children: React.ReactNode;  // Agregar 'children' aquí
  }
  
  export const DialogTrigger: React.FC<DialogTriggerProps> = ({ onClick, children }) => (
    <button onClick={onClick} className="btn btn-primary">
      {children}  {/* Aquí se usará el contenido pasado a 'DialogTrigger' */}
    </button>
  )
export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
)

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4 text-xl font-semibold">{children}</div>
)

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-bold">{children}</h3>
)
