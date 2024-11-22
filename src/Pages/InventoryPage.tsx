'use client'

import { SetStateAction, useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'

interface Juguete {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

export default function Inventario() {
  const [juguetes, setJuguetes] = useState<Juguete[]>([
    { id: 1, nombre: "Oso de peluche", precio: 19.99, cantidad: 50 },
    { id: 2, nombre: "Carro de control remoto", precio: 29.99, cantidad: 30 },
    { id: 3, nombre: "Muñeca", precio: 24.99, cantidad: 40 },
    { id: 4, nombre: "Juego de construcción", precio: 15.99, cantidad: 20 },
    { id: 5, nombre: "Rompecabezas", precio: 9.99, cantidad: 15 },
    { id: 6, nombre: "Dinosaurio", precio: 35.99, cantidad: 10 },
    { id: 7, nombre: "Avión a control remoto", precio: 49.99, cantidad: 5 },
  ])

  const [busqueda, setBusqueda] = useState('')
  const [jugueteEditando, setJugueteEditando] = useState<Juguete | null>(null)
  const [dialogoAbierto, setDialogoAbierto] = useState(false)

  const [paginaActual, setPaginaActual] = useState(1)
  const elementosPorPagina = 5

  const juguetesFiltrados = juguetes.filter(juguete => 
    juguete.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const totalPaginas = Math.ceil(juguetesFiltrados.length / elementosPorPagina)
  const juguetesPaginaActual = juguetesFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  )

  const handleCambiarPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina)
    }
  }

  const agregarOEditarJuguete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nuevoJuguete = {
      id: jugueteEditando ? jugueteEditando.id : Date.now(),
      nombre: formData.get('nombre') as string,
      precio: parseFloat(formData.get('precio') as string),
      cantidad: parseInt(formData.get('cantidad') as string, 10)
    }

    if (jugueteEditando) {
      setJuguetes(juguetes.map(j => j.id === jugueteEditando.id ? nuevoJuguete : j))
    } else {
      setJuguetes([...juguetes, nuevoJuguete])
    }

    setJugueteEditando(null)
    setDialogoAbierto(false)
  }

  const eliminarJuguete = (id: number) => {
    setJuguetes(juguetes.filter(j => j.id !== id))
  }

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg rounded-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-t-lg">
        <CardTitle className="text-3xl font-bold">Inventario de Juguetes</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Sección de búsqueda y botón de agregar juguete */}
        <div className="flex justify-between items-center">
          <div className="relative w-80">
            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar juguetes..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8 border-gray-300 rounded-md focus:ring-blue-500"
            />
            <br /><br />
          </div>
          <Button 
            onClick={() => setDialogoAbierto(true)} 
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center rounded-lg shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span className="ml-0"></span>
          </Button>
        </div>

        {/* Diálogo para agregar o editar un juguete */}
        <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-blue-700">
                {jugueteEditando ? 'Editar Juguete' : 'Agregar Nuevo Juguete'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={agregarOEditarJuguete} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input 
                  id="nombre" 
                  name="nombre" 
                  defaultValue={jugueteEditando?.nombre} 
                  required 
                  className="border-gray-300 rounded-md focus:ring-blue-500" 
                />
              </div>
              <div>
                <Label htmlFor="precio">Precio</Label>
                <Input 
                  id="precio" 
                  name="precio" 
                  type="number" 
                  step="0.01" 
                  defaultValue={jugueteEditando?.precio} 
                  required 
                  className="border-gray-300 rounded-md focus:ring-blue-500" 
                />
              </div>
              <div>
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input 
                  id="cantidad" 
                  name="cantidad" 
                  type="number" 
                  defaultValue={jugueteEditando?.cantidad} 
                  required 
                  className="border-gray-300 rounded-md focus:ring-blue-500" 
                />
              </div>
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md">
                {jugueteEditando ? 'Actualizar' : 'Agregar'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Tabla de juguetes */}
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {juguetesPaginaActual.map((juguete) => (
              <TableRow key={juguete.id}>
                <TableCell>{juguete.nombre}</TableCell>
                <TableCell>${juguete.precio.toFixed(2)}</TableCell>
                <TableCell>{juguete.cantidad}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setJugueteEditando(juguete)
                      setDialogoAbierto(true)
                    }} 
                    className="text-blue-500 bg-blue-500"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => eliminarJuguete(juguete.id)} 
                    className="text-red-500 bg-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Paginación */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <Button 
            disabled={paginaActual === 1} 
            onClick={() => handleCambiarPagina(paginaActual - 1)} 
            className="bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Anterior
          </Button>
          <span className="text-gray-700 font-semibold">{paginaActual} de {totalPaginas}</span>
          <Button 
            disabled={paginaActual === totalPaginas} 
            onClick={() => handleCambiarPagina(paginaActual + 1)} 
            className="bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
