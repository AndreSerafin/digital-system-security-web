'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EditSystemDialog } from './edit-system-dialog'
import { useQuery } from '@tanstack/react-query'
import { makeAxiosSystemsService } from '@/services/axios/factories/make-axios-systems-service'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

const systemsService = makeAxiosSystemsService()

export function SystemsTable() {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
  const [selectedSystemId, setSelectedSystemId] = useState<string>('')

  const { data: systemsData } = useQuery({
    queryKey: ['fetch-systems'],
    queryFn: async () => {
      const { data } = await systemsService.fetch()

      return data
    },
  })

  function handleOpenEditDialog(id: string) {
    setEditDialogIsOpen(true)
    setSelectedSystemId(id)
  }

  return (
    <>
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead align="center">Sigla</TableHead>
            <TableHead>E-mail de atendimento do sistema</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {systemsData?.systems.map((system, index) => (
            <TableRow key={system.acronym + index}>
              <TableCell className="font-medium">
                {system.description}
              </TableCell>
              <TableCell>{system.acronym}</TableCell>
              <TableCell>{system.attendance_email ?? '------'}</TableCell>
              <TableCell>{system.url}</TableCell>
              <TableCell>{system.status}</TableCell>
              <TableCell>
                <button
                  className="rounded-full hover:bg-slate-200 p-2 transition-all"
                  onClick={() => handleOpenEditDialog(system.id)}
                >
                  <Pencil className="text-slate-600" size={18} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditSystemDialog
        isOpen={editDialogIsOpen}
        setIsOpen={setEditDialogIsOpen}
        systemId={selectedSystemId}
      />
    </>
  )
}
