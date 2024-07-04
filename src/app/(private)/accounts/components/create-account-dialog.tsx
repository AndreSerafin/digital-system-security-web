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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { makeAxiosAccountsService } from '@/services/axios/factories/make-axios-account-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createAccountFormSchema = z.object({
  name: z.string().min(1, 'Campo Obrigatório'),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, 'Campo Obrigatório'),
  role: z.enum(['SUPER_ADMIN', 'SYSTEM_ADMIN', 'TECHINICAL_MANAGER']),
})

type CreateAccountFormInputs = z.infer<typeof createAccountFormSchema>

const accountsService = makeAxiosAccountsService()

export function CreateAccountDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const { mutateAsync: handleCreateAccount, isPending } = useMutation({
    mutationKey: ['create-account'],
    mutationFn: async ({
      email,
      name,
      password,
      role,
    }: CreateAccountFormInputs) => {
      const { data } = await accountsService.create({
        email,
        name,
        password,
        role,
      })

      return data
    },
    onSuccess: () => {
      toast({ variant: 'success', title: 'Conta criada com sucesso' })
      queryClient.refetchQueries({ queryKey: ['fetch-accounts'] })
      handleCloseDialog()
    },
  })

  const createAccountForm = useForm<CreateAccountFormInputs>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    mode: 'onChange',
    disabled: isPending,
  })

  const { reset } = createAccountForm

  function handleCloseDialog() {
    setIsOpen(false)
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: 'default', className: 'gap-x-2' })}
      >
        <Plus />
        Criar nova conta
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova conta</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar uma nova conta.
          </DialogDescription>
        </DialogHeader>
        <Form {...createAccountForm}>
          <form
            className="space-y-1"
            onSubmit={createAccountForm.handleSubmit((data) =>
              handleCreateAccount(data),
            )}
          >
            <div className="p-4 border-[2px] rounded-md relative space-y-2">
              <h2 className="absolute top-[-14px] px-2 left-1 font-semibold bg-background">
                Dados da conta
              </h2>
              <FormField
                control={createAccountForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createAccountForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createAccountForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createAccountForm.control}
                name="role"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Select onValueChange={onChange} {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cargo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SUPER_ADMIN">
                            Super Administrador
                          </SelectItem>
                          <SelectItem value="SYSTEM_ADMIN">
                            Administrador do Sistema
                          </SelectItem>
                          <SelectItem value="TECHINICAL_MANAGER">
                            Responsável Técnico
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
