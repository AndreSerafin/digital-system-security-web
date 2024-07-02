import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Pencil } from 'lucide-react'

export function EditSystemDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full hover:bg-slate-200 p-2 transition-all">
          <Pencil className="text-slate-600" size={18} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar sistema</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para alterar as informações do sistema.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="space-y-4">
            <div className="p-4 border-[2px] rounded-md relative grid grid-cols-2 gap-x-2">
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
            <div className="p-4 border-[2px] rounded-md relative">
              <h2 className="absolute top-[-14px] px-2 left-1 font-semibold bg-background">
                Controle do sistema
              </h2>

              <div>
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status Atual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Usuários responsável pela última alteração</Label>
                <Input />
              </div>
              <div>
                <Label>Data da última alteração</Label>
                <Input />
              </div>
              <div>
                <Label>Justificativa da última alteração</Label>
                <Textarea />
              </div>
              <div>
                <Label>Nova justificativa de alteração</Label>
                <Textarea />
              </div>
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
