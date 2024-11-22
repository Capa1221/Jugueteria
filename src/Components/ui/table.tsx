import React from 'react'

interface TableProps {
  children: React.ReactNode
}

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <table className="min-w-full table-auto">{children}</table>
  )
}

interface TableHeaderProps {
  children: React.ReactNode
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead className="bg-gray-100">{children}</thead>
  )
}

interface TableBodyProps {
  children: React.ReactNode
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody>{children}</tbody>
  )
}

interface TableRowProps {
  children: React.ReactNode
}

export const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return (
    <tr className="border-b">{children}</tr>
  )
}

interface TableCellProps {
  children: React.ReactNode
}

export const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return (
    <td className="px-4 py-2">{children}</td>
  )
}

interface TableHeadProps {
  children: React.ReactNode
}

export const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <th className="px-4 py-2 text-left font-semibold">{children}</th>
  )
}
