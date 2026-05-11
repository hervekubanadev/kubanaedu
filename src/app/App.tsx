import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from '../providers/AppProviders'
import { AppSplash } from '../components/branding/AppSplash'
import { AppRouter } from './router'

export function App() {
  return (
    <Suspense fallback={<AppSplash />}>
      <AppProviders>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppProviders>
    </Suspense>
  )
}
