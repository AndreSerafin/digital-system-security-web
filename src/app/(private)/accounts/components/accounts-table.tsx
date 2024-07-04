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
import { makeAxiosAccountsService } from '@/services/axios/factories/make-axios-account-service'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const accountsService = makeAxiosAccountsService()

export function AccountsTable() {
  const params = useSearchParams()
  const page = Number(params.get('page')) > 0 ? Number(params.get('page')) : 1

  const attendanceEmail = params.get('attendanceEmail')
  const description = params.get('description')
  const acronym = params.get('acronym')
  const router = useRouter()

  const [totalOfPages, setTotalOfPages] = useState(0)

  const { data: accountsData } = useQuery({
    queryKey: ['fetch-accounts', attendanceEmail, description, acronym, page],
    queryFn: async () => {
      const { data } = await accountsService.fetch({
        params: {
          page,
        },
      })

      return data
    },
  })

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams()

    params.append('page', newPage.toString())

    router.replace('?' + params.toString())
  }

  useEffect(() => {
    setTotalOfPages(accountsData ? Math.ceil(accountsData.total / 10) : 0)
  }, [accountsData])

  return (
    <>
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead align="center">Email</TableHead>
            <TableHead>Cargo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accountsData?.users.map((account, index) => (
            <TableRow key={account.name + index}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </>
  )
}
