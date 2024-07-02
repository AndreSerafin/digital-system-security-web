import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FileMinus, Search } from 'lucide-react'
import { CreateSystemDialog } from './components/create-system-dialog'
import { EditSystemDialog } from './components/edit-system-dialog'

const systems = [
  {
    description: 'Sistema de Faturamento',
    abbreviation: 'SF',
    supportEmail: 'suporte@faturamento.com',
  },
  {
    description: 'Sistema de Pagamentos',
    abbreviation: 'SP',
    supportEmail: 'suporte@pagamentos.com',
  },
  {
    description: 'Sistema de Transferências',
    abbreviation: 'ST',
    supportEmail: 'suporte@transferencias.com',
  },
  {
    description: 'Sistema de Vendas',
    abbreviation: 'SV',
    supportEmail: 'suporte@vendas.com',
  },
  {
    description: 'Sistema de Compras',
    abbreviation: 'SC',
    supportEmail: 'suporte@compras.com',
  },
  {
    description: 'Sistema de Logística',
    abbreviation: 'SL',
    supportEmail: 'suporte@logistica.com',
  },
  {
    description: 'Sistema de Inventário',
    abbreviation: 'SI',
    supportEmail: 'suporte@inventario.com',
  },
]

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
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead align="center">Sigla</TableHead>
                <TableHead>E-mail de atendimento do sistema</TableHead>
                <TableHead align="center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systems.map((system, index) => (
                <TableRow key={system.abbreviation + index}>
                  <TableCell className="font-medium">
                    {system.description}
                  </TableCell>
                  <TableCell>{system.abbreviation}</TableCell>
                  <TableCell>{system.supportEmail}</TableCell>
                  <TableCell>
                    <EditSystemDialog />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
