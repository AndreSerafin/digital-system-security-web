import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { AuthForm } from './components/authenticate-form'

export default function SignIn() {
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Faça seu login abaixo para acessar o Sistema de Segurança Digital
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  )
}
