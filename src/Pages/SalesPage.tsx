'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'

interface Venta {
  id: number
  cliente: string
  fecha: string
  total: number
}

export default function Ventas() {
  const [ventas, setVentas] = useState<Venta[]>([
    { id: 1, cliente: "Carlos Jaimes", fecha: "2024-11-01", total: 89.99 },
    { id: 2, cliente: "Juan Pérez", fecha: "2024-11-02", total: 149.99 },
    { id: 3, cliente: "Ana Gómez", fecha: "2024-11-03", total: 199.99 },
  ])
  const [busqueda, setBusqueda] = useState('')
  const [ventaEditando, setVentaEditando] = useState<Venta | null>(null)
  const [dialogoAbierto, setDialogoAbierto] = useState(false)

  const navigate = useNavigate()

  const ventasFiltradas = ventas.filter(venta => 
    venta.cliente.toLowerCase().includes(busqueda.toLowerCase())
  )

  const ventasPorPagina = 5
  const totalPaginas = Math.ceil(ventasFiltradas.length / ventasPorPagina)
  const [paginaActual, setPaginaActual] = useState(1)

  const ventasFiltradasPorPagina = ventasFiltradas.slice(
    (paginaActual - 1) * ventasPorPagina,
    paginaActual * ventasPorPagina
  )

  const manejarCambioPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina)
    }
  }

  const agregarOEditarVenta = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nuevaVenta = {
      id: ventaEditando ? ventaEditando.id : Date.now(),
      cliente: formData.get('cliente') as string,
      fecha: formData.get('fecha') as string,
      total: parseFloat(formData.get('total') as string)
    }

    if (ventaEditando) {
      setVentas(ventas.map(v => v.id === ventaEditando.id ? nuevaVenta : v))
    } else {
      setVentas([...ventas, nuevaVenta])
    }

    setVentaEditando(null)
    setDialogoAbierto(false)
  }

  const eliminarVenta = (id: number) => {
    setVentas(ventas.filter(v => v.id !== id))
  }

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg rounded-lg bg-gray-50">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-t-lg p-6">
        <CardTitle className="text-3xl font-bold">VENTAS</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between mb-6 items-center">
          <div className="relative w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8 border-gray-300 shadow-sm focus:ring-green-500 rounded-md"
            />
          </div>

          {/* Botón de Agregar Nueva Venta */}
          <Button 
            onClick={() => setDialogoAbierto(true)} 
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center rounded-lg shadow-md transition-all"
          >
            <Plus className="mr-0 h-5 w-5" /> 
          </Button>
        </div>

        <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
            <DialogHeader className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold text-green-700">{ventaEditando ? 'Editar Venta' : 'Agregar Nueva Venta'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={agregarOEditarVenta} className="space-y-4">
              <div>
                <Label htmlFor="cliente" className="font-semibold">Cliente</Label>
                <Input id="cliente" name="cliente" defaultValue={ventaEditando?.cliente} required className="border-gray-300 shadow-sm focus:ring-green-500 rounded-md" />
              </div>
              <div>
                <Label htmlFor="fecha" className="font-semibold">Fecha</Label>
                <Input id="fecha" name="fecha" type="date" defaultValue={ventaEditando?.fecha} required className="border-gray-300 shadow-sm focus:ring-green-500 rounded-md" />
              </div>
              <div>
                <Label htmlFor="total" className="font-semibold">Total</Label>
                <Input id="total" name="total" type="number" defaultValue={ventaEditando?.total} required className="border-gray-300 shadow-sm focus:ring-green-500 rounded-md" />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setDialogoAbierto(false)} 
                  className="border-gray-300 hover:bg-gray-100 transition-all"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                  {ventaEditando ? 'Actualizar' : 'Agregar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Tabla de Ventas */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ventasFiltradasPorPagina.map((venta) => (
              <TableRow key={venta.id} className="hover:bg-gray-50 transition-all">
                <TableCell>{venta.cliente}</TableCell>
                <TableCell>{venta.fecha}</TableCell>
                <TableCell>${venta.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setVentaEditando(venta)
                      setDialogoAbierto(true)
                    }} 
                    className="text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => eliminarVenta(venta.id)} 
                    className="text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Paginación */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <Button 
            disabled={paginaActual === 1} 
            onClick={() => handleCambiarPagina(paginaActual - 1)} 
            className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
          >
            Anterior
          </Button>
          <span className="text-gray-700 font-semibold">{paginaActual} de {totalPaginas}</span>
          <Button 
            disabled={paginaActual === totalPaginas} 
            onClick={() => handleCambiarPagina(paginaActual + 1)} 
            className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
