import { Card, CardContent } from '@/components/ui/card'
import { AccountsTable } from './components/accounts-table'
import { CreateAccountDialog } from './components/create-account-dialog'
import { PermissionGate } from '@/components/permission-gate'

export default function Accounts() {
  return (
    <PermissionGate type="route" allowedRoles={['SUPER_ADMIN']}>
      <div className="flex flex-col gap-4 mt-4 mx-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-primary border-l-2 border-primary pl-4">
            Contas Cadastradas
          </h1>
          <CreateAccountDialog />
        </div>
        <Card>
          <CardContent className="py-4 space-y-6">
            <AccountsTable />
          </CardContent>
        </Card>
      </div>
    </PermissionGate>
  )
}
