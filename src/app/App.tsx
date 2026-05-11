import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppSplash } from '../components/branding/AppSplash'
import { AppRouter } from './router'

export function App() {
  return (
    <Suspense fallback={<AppSplash />}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  )
}
