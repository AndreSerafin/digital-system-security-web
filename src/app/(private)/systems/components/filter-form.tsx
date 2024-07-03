'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileMinus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// const filterFormSchema = z.object({
//   description: z.string().optional(),
//   acronym: z.string().optional(),
//   attendanceEmail: z.string().optional(),
// })

export function FilterForm() {
  return (
    <div>
      <div>
        <h2 className="font-bold">Filtro de consulta</h2>
      </div>
      <form className="flex justify-between items-end">
        <div className="flex gap-4">
          <div>
            <Label>Descrição</Label>
            <Input />
          </div>
          <div>
            <Label>Sigla</Label>
            <Input />
          </div>
          <div>
            <Label>E-mail de atendimento do sistema</Label>
            <Input />
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button className="gap-x-2" variant={'outline'}>
            <FileMinus size={16} /> Limpar
          </Button>
          <Button className="gap-x-2">
            <Search size={16} /> Buscar
          </Button>
        </div>
      </form>
    </div>
  )
}
