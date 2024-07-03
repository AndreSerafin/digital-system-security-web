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

const systemsService = makeAxiosSystemsService()

export function SystemsTable() {
  const { data: systemsData } = useQuery({
    queryKey: ['fetch-systems'],
    queryFn: async () => {
      const { data } = await systemsService.fetch()

      return data
    },
  })

  return (
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
            <TableCell className="font-medium">{system.description}</TableCell>
            <TableCell>{system.acronym}</TableCell>
            <TableCell>{system.attendance_email ?? '------'}</TableCell>
            <TableCell>{system.url}</TableCell>
            <TableCell>{system.status}</TableCell>
            <TableCell>
              <EditSystemDialog />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
