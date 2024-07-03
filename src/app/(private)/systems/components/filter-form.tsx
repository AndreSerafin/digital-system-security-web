'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileMinus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const filterFormSchema = z.object({
  description: z.string().optional(),
  acronym: z.string().optional(),
  attendanceEmail: z.string().optional(),
})

type FilterFormInputs = z.infer<typeof filterFormSchema>

export function FilterForm() {
  const filterForm = useForm<FilterFormInputs>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      acronym: '',
      attendanceEmail: '',
      description: '',
    },
  })
  const router = useRouter()

  function handleMountQueryUrl({
    acronym,
    attendanceEmail,
    description,
  }: FilterFormInputs) {
    const queryUrl = new URLSearchParams()

    acronym && queryUrl.append('acronym', acronym)
    attendanceEmail && queryUrl.append('attendanceEmail', attendanceEmail)
    description && queryUrl.append('description', description)

    router.replace(`?${queryUrl.toString()}`)
  }

  return (
    <div>
      <div>
        <h2 className="font-bold">Filtro de consulta</h2>
      </div>
      <form onSubmit={filterForm.handleSubmit(handleMountQueryUrl)}>
        <Form {...filterForm}>
          <div className="flex justify-between items-end">
            <div className="flex gap-4">
              <FormField
                control={filterForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterForm.control}
                name="acronym"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Sigla</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterForm.control}
                name="attendanceEmail"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>E-mail de atendimento do sistema</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-x-2">
              <Button
                className="gap-x-2"
                variant={'outline'}
                type="button"
                onClick={() => {
                  router.replace('?')
                  filterForm.reset()
                }}
              >
                <FileMinus size={16} /> Limpar
              </Button>
              <Button className="gap-x-2">
                <Search size={16} /> Buscar
              </Button>
            </div>
          </div>
        </Form>
      </form>
    </div>
  )
}
