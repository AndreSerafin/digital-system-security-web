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
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const authenticateUserFormSchema = z.object({
  email: z
    .string({ required_error: 'Campo Obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string({ required_error: 'Campo Obrigatório' }),
})

type AuthenticateUserFormInput = z.infer<typeof authenticateUserFormSchema>

export function AuthForm() {
  const [isSigningIn, setIsSigningIn] = useState(false)

  const router = useRouter()
  const authenticateUserForm = useForm<AuthenticateUserFormInput>({
    resolver: zodResolver(authenticateUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    disabled: isSigningIn,
  })

  async function onSubmit({ email, password }: AuthenticateUserFormInput) {
    setIsSigningIn(true)
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      toast({ variant: 'destructive', title: 'Credenciais Inválidas' })
    } else {
      router.replace('/systems')
    }
    setIsSigningIn(false)
  }

  return (
    <Form {...authenticateUserForm}>
      <form onSubmit={authenticateUserForm.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <FormField
            control={authenticateUserForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={authenticateUserForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="∗∗∗∗∗∗∗∗∗∗" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-1.5"></div>
        </div>
        <Button disabled={isSigningIn} type="submit" className="flex-1 w-full">
          {isSigningIn ? <Loader2 className="animate-spin" /> : 'Entrar'}
        </Button>
      </form>
    </Form>
  )
}
