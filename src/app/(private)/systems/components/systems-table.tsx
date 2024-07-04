'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { makeAxiosSystemsService } from '@/services/axios/factories/make-axios-systems-service'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Pencil } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EditSystemDialog } from './edit-system-dialog'
import { PermissionGate } from '@/components/permission-gate'

const systemsService = makeAxiosSystemsService()

export function SystemsTable() {
  const params = useSearchParams()
  const page = Number(params.get('page')) > 0 ? Number(params.get('page')) : 1

  const attendanceEmail = params.get('attendanceEmail')
  const description = params.get('description')
  const acronym = params.get('acronym')
  const router = useRouter()

  const [totalOfPages, setTotalOfPages] = useState(0)

  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
  const [selectedSystemId, setSelectedSystemId] = useState<string>('')

  const { data: systemsData } = useQuery({
    queryKey: ['fetch-systems', attendanceEmail, description, acronym, page],
    queryFn: async () => {
      const { data } = await systemsService.fetch({
        params: {
          page,
          acronym,
          attendance_email: attendanceEmail,
          description,
        },
      })

      return data
    },
  })

  function handleOpenEditDialog(id: string) {
    setEditDialogIsOpen(true)
    setSelectedSystemId(id)
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams()

    params.append('page', newPage.toString())
    attendanceEmail && params.append('attendanceEmail', attendanceEmail)
    description && params.append('description', description)
    acronym && params.append('acronym', acronym)

    router.replace('?' + params.toString())
  }

  useEffect(() => {
    setTotalOfPages(systemsData ? Math.ceil(systemsData.total / 10) : 0)
  }, [systemsData])

  return (
    <>
      {systemsData?.total === 0 ? (
        <div className="h-[350px] font-semibold flex flex-col justify-center items-center">
          <p>Nenhum Sistema foi encontrado.</p>
          <p> Favor revisar os critérios da sua pesquisa!</p>
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead align="center">Sigla</TableHead>
              <TableHead>E-mail de atendimento do sistema</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <PermissionGate
                type="route"
                allowedRoles={['SYSTEM_ADMIN', 'SUPER_ADMIN']}
              >
                <TableHead>Ações</TableHead>
              </PermissionGate>
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
                <TableCell>
                  {system.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </TableCell>
                <PermissionGate
                  type="route"
                  allowedRoles={['SYSTEM_ADMIN', 'SUPER_ADMIN']}
                >
                  <TableCell>
                    <button
                      className="rounded-full hover:bg-slate-200 p-2 transition-all"
                      onClick={() => handleOpenEditDialog(system.id)}
                    >
                      <Pencil className="text-slate-600" size={18} />
                    </button>
                  </TableCell>
                </PermissionGate>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="w-full flex justify-end">
        <div className="flex items-center gap-x-4 text-primary">
          <Button
            variant={'outline'}
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft />
            Anterior
          </Button>
          <span className="text-xl font-semibold">{page}</span>
          <Button
            variant={'outline'}
            disabled={page === totalOfPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Próximo
            <ChevronRight />
          </Button>
        </div>
      </div>
      <EditSystemDialog
        isOpen={editDialogIsOpen}
        setIsOpen={setEditDialogIsOpen}
        systemId={selectedSystemId}
      />
    </>
  )
}
