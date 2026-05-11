import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/ui/Card'
import { MetricCard } from '../features/dashboard/components/MetricCard'

const metricCards = ['Total Students', 'Attendance Rate', 'Active Teachers', 'Parent Engagement']

export function DashboardPage() {
  return (
    <PageContainer className="space-y-6 sm:space-y-7">
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Dashboard</h2>
        <p className="text-sm text-slate-500 sm:text-base">Your school operations overview.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((title) => (
          <MetricCard key={title} title={title} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h3 className="text-base font-semibold text-slate-900">Insights panel</h3>
          <div className="mt-4 h-56 rounded-xl border border-dashed border-blue-100/90 bg-gradient-to-br from-white via-blue-50/55 to-blue-100/40" />
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-slate-900">Recent activity</h3>
          <div className="mt-4 h-56 rounded-xl border border-dashed border-blue-100/90 bg-gradient-to-br from-white via-blue-50/55 to-blue-100/40" />
        </Card>
      </section>
    </PageContainer>
  )
}
