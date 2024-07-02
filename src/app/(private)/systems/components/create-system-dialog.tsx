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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'

export function CreateSystemDialog() {
  return (
    <Dialog>
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
        <form className="space-y-1">
          <div className="p-4 border-[2px] rounded-md relative">
            <h2 className="absolute top-[-14px] px-2 left-1 font-semibold bg-background">
              Dados do sistema
            </h2>
            <div>
              <Label>Descrição</Label>
              <Input />
            </div>
            <div>
              <Label>Sigla</Label>
              <Input />
            </div>
            <div>
              <Label>Email de atendimento</Label>
              <Input />
            </div>
            <div>
              <Label>URL</Label>
              <Input />
            </div>
          </div>

          <DialogFooter className="justify-end !mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Voltar
              </Button>
            </DialogClose>
            <Button type="submit">Confirmar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
