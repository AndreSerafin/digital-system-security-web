import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileMinus, Search } from 'lucide-react'
import { CreateSystemDialog } from './components/create-system-dialog'
import { SystemsTable } from './components/systems-table'

export default function Systems() {
  return (
    <div className="flex flex-col gap-4 mt-4 mx-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-primary border-l-2 border-primary pl-4">
          Pesquisar Sistema
        </h1>
        <CreateSystemDialog />
      </div>
      <Card>
        <CardContent className="py-4 space-y-6">
          <div>
            <h2 className="font-bold">Filtro de consulta</h2>
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
          <SystemsTable />
        </CardContent>
      </Card>
    </div>
  )
}
