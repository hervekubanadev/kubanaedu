import { Card } from '../../../components/ui/Card'

type MetricCardProps = {
  title: string
}

export function MetricCard({ title }: MetricCardProps) {
  return (
    <Card interactive>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-4 h-8 w-24 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200/65" />
      <div className="mt-3 h-2 w-full rounded-full bg-blue-50/90" />
    </Card>
  )
}
