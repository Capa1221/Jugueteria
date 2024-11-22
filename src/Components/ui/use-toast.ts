// src/components/ui/use-toast.ts
import { useState } from "react"

export const useToast = () => {
  const [toasts, setToasts] = useState<any[]>([])

  const addToast = (message: string) => {
    setToasts([...toasts, { message, id: Date.now() }])
  }

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    addToast,
    removeToast,
  }
}
