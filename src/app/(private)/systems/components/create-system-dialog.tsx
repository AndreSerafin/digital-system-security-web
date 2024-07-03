'use client'

import { queryClient } from '@/components/tanstack-provider'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { toast } from '@/components/ui/use-toast'
import { makeAxiosSystemsService } from '@/services/axios/factories/make-axios-systems-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createSystemFormSchema = z.object({
  description: z.string().min(1, 'Campo Obrigatório'),
  acronym: z.string().min(1, 'Campo Obrigatório'),
  attendanceEmail: z.string().email({ message: 'E-mail inválido' }).optional(),
  url: z.string().url({ message: 'URL Inválida' }),
})

type CreateSystemFormInputs = z.infer<typeof createSystemFormSchema>

const systemsService = makeAxiosSystemsService()

export function CreateSystemDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const { mutateAsync: handleCreateSystem, isPending } = useMutation({
    mutationKey: ['create-system'],
    mutationFn: async ({
      acronym,
      description,
      url,
      attendanceEmail,
    }: CreateSystemFormInputs) => {
      const { data } = await systemsService.create({
        acronym,
        attendance_email: attendanceEmail,
        description,
        url,
      })

      return data
    },
    onSuccess: () => {
      toast({ variant: 'success', title: 'Sistema criado com sucesso' })
      queryClient.fetchQuery({ queryKey: ['fetch-systems'] })
      handleCloseDialog()
    },
  })

  const createSystemForm = useForm<CreateSystemFormInputs>({
    resolver: zodResolver(createSystemFormSchema),
    defaultValues: {
      acronym: '',
      attendanceEmail: undefined,
      description: '',
      url: '',
    },
    mode: 'onChange',
    disabled: isPending,
  })

  const { watch, setValue, reset } = createSystemForm
  const attendanceEmail = watch('attendanceEmail')

  function handleCloseDialog() {
    setIsOpen(false)
    reset()
  }

  useEffect(() => {
    if (attendanceEmail === '') {
      setValue('attendanceEmail', undefined)
    }
  }, [attendanceEmail, setValue])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: 'default', className: 'gap-x-2' })}
      >
        <Plus />
        Incluir novo sistema
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incluir novo sistema</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para incluir um novo sistema.
          </DialogDescription>
        </DialogHeader>
        <Form {...createSystemForm}>
          <form
            className="space-y-1"
            onSubmit={createSystemForm.handleSubmit((data) =>
              handleCreateSystem(data),
            )}
          >
            <div className="p-4 border-[2px] rounded-md relative space-y-2">
              <h2 className="absolute top-[-14px] px-2 left-1 font-semibold bg-background">
                Dados do sistema
              </h2>
              <FormField
                control={createSystemForm.control}
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
                control={createSystemForm.control}
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
                control={createSystemForm.control}
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
                control={createSystemForm.control}
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

            <DialogFooter className="justify-end !mt-6">
              <DialogClose asChild>
                <Button disabled={isPending} type="button" variant="outline">
                  Voltar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Confirmar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
