'use client'

import { queryClient } from '@/components/tanstack-provider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { makeAxiosSystemsService } from '@/services/axios/factories/make-axios-systems-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { parseISO, format } from 'date-fns'

const editSystemFormSchema = z.object({
  description: z.string().min(1, 'Campo Obrigatório'),
  acronym: z.string().min(1, 'Campo Obrigatório'),
  attendanceEmail: z.string().email({ message: 'E-mail inválido' }).optional(),
  url: z.string().url({ message: 'URL Inválida' }),
  status: z.enum(['ACTIVE', 'INACTIVE', '']),
  lastUpdateAuthor: z.string().optional(),
  lastUpdateJustification: z.string().optional(),
  newUpdateJustification: z.string().min(1, 'Campo obrigatório'),
  updatedAt: z.string().optional(),
})

type EditSystemFormInputs = z.infer<typeof editSystemFormSchema>

const systemsService = makeAxiosSystemsService()

interface EditSystemProps {
  systemId: string
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

export function EditSystemDialog({
  systemId,
  isOpen,
  setIsOpen,
}: EditSystemProps) {
  const { data: systemData } = useQuery({
    queryKey: ['get-system-by-id', isOpen, systemId],
    queryFn: async () => {
      const { data } = await systemsService.getById(systemId)
      return data
    },
  })

  const { mutateAsync: handleEditSystem, isPending } = useMutation({
    mutationKey: ['edit-system'],
    mutationFn: async ({
      acronym,
      description,
      url,
      status,
      attendanceEmail,
      newUpdateJustification,
    }: EditSystemFormInputs) => {
      const { data } = await systemsService.update(systemId, {
        acronym,
        attendance_email: attendanceEmail,
        description,
        url,
        update_justification: newUpdateJustification,
        status: status.length === 0 ? 'ACTIVE' : status,
      })

      return data
    },
    onSuccess: () => {
      toast({ variant: 'success', title: 'Sistema editado com sucesso' })
      queryClient.fetchQuery({ queryKey: ['fetch-systems'] })
      handleCloseDialog()
    },
  })

  const editSystemForm = useForm<EditSystemFormInputs>({
    resolver: zodResolver(editSystemFormSchema),
    defaultValues: {
      acronym: '',
      attendanceEmail: undefined,
      description: '',
      url: '',
      lastUpdateAuthor: '',
      lastUpdateJustification: '',
      newUpdateJustification: '',
      status: '',
    },
    mode: 'onChange',
    disabled: isPending,
  })

  const { watch, setValue, reset, handleSubmit } = editSystemForm
  const attendanceEmail = watch('attendanceEmail')

  function handleCloseDialog() {
    setIsOpen(false)
    reset()
  }

  function handleFillFields({
    acronym,
    description,
    url,
    attendanceEmail,
    status,
    newUpdateJustification,
    lastUpdateAuthor,
    lastUpdateJustification,
    updatedAt,
  }: EditSystemFormInputs) {
    setValue('acronym', acronym)
    setValue('description', description)
    setValue('url', url)
    setValue('attendanceEmail', attendanceEmail)
    setValue('status', status)
    setValue('lastUpdateAuthor', lastUpdateAuthor)
    setValue('lastUpdateJustification', lastUpdateJustification)
    setValue('newUpdateJustification', newUpdateJustification)
    updatedAt &&
      setValue('updatedAt', format(parseISO(updatedAt), 'dd-MM-yyyy hh:mm'))
  }

  useEffect(() => {
    if (attendanceEmail === '') {
      setValue('attendanceEmail', undefined)
    }
  }, [attendanceEmail, setValue])

  useEffect(() => {
    if (systemData) {
      const { system } = systemData
      system &&
        handleFillFields({
          acronym: system.acronym,
          description: system.description,
          url: system.url,
          attendanceEmail:
            system.attendance_email !== null
              ? system.attendance_email
              : undefined,
          status: system.status,
          lastUpdateAuthor: system.last_update_author,
          lastUpdateJustification: system.last_update_justification,
          newUpdateJustification: '',
          updatedAt: system.updated_at ?? '',
        })
    }
  }, [systemData])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar sistema</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para alterar as informações do sistema.
          </DialogDescription>
        </DialogHeader>
        <Form {...editSystemForm}>
          <form onSubmit={handleSubmit((data) => handleEditSystem(data))}>
            <div className="space-y-4">
              <div className="p-4 border-[2px] rounded-md relative space-y-2">
                <h2 className="absolute top-[-14px] px-2 left-1 font-semibold bg-background">
                  Dados do sistema
                </h2>
                <FormField
                  control={editSystemForm.control}
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
                  control={editSystemForm.control}
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
                  control={editSystemForm.control}
                  name="attendanceEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Email de atendimento</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editSystemForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="p-4 border-[2px] rounded-md relative space-y-2">
                <h2 className="absolute top-[-14px] px-2 left-1 font-semibold bg-background">
                  Controle do sistema
                </h2>

                <FormField
                  control={editSystemForm.control}
                  name="status"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={onChange} {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Status Atual" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Ativo</SelectItem>
                            <SelectItem value="INACTIVE">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editSystemForm.control}
                  disabled
                  name="lastUpdateAuthor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>
                        Usuário responsável pela última alteração
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editSystemForm.control}
                  disabled
                  name="updatedAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Data da última alteração</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editSystemForm.control}
                  disabled
                  name="lastUpdateJustification"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Justificativa da última alteração</FormLabel>
                      <FormControl>
                        <Textarea className="max-h-[300px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editSystemForm.control}
                  name="newUpdateJustification"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel>Nova justificativa de alteração</FormLabel>
                      <FormControl>
                        <Textarea className="max-h-[300px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="justify-end !mt-6">
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="outline">
                  Voltar
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                {isPending ? <Loader2 className="animate-spin" /> : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
