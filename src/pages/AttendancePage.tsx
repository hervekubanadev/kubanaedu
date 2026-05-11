import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/ui/Card'

export function AttendancePage() {
  return (
    <PageContainer className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Attendance</h2>
      <Card>
        <div className="h-56 rounded-xl border border-dashed border-slate-200 bg-slate-50" />
      </Card>
    </PageContainer>
  )
}
