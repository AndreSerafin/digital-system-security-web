import { Card, CardContent } from '@/components/ui/card'

import { CreateSystemDialog } from './components/create-system-dialog'
import { SystemsTable } from './components/systems-table'
import { FilterForm } from './components/filter-form'
import { PermissionGate } from '@/components/permission-gate'

export default function Systems() {
  return (
    <PermissionGate
      type="route"
      allowedRoles={['SUPER_ADMIN', 'SYSTEM_ADMIN', 'TECHINICAL_MANAGER']}
    >
      <div className="flex flex-col gap-4 mt-4 mx-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-primary border-l-2 border-primary pl-4">
            Pesquisar Sistema
          </h1>
          <PermissionGate type="route" allowedRoles={['SUPER_ADMIN']}>
            <CreateSystemDialog />
          </PermissionGate>
        </div>
        <Card>
          <CardContent className="py-4 space-y-6">
            <FilterForm />
            <SystemsTable />
          </CardContent>
        </Card>
      </div>
    </PermissionGate>
  )
}
