import { RouterProvider } from 'react-router-dom'
import { environment } from './api/relay'
import './App.css'
import { Toaster } from './components/ui/toaster'
import { RelayEnvironmentProvider } from "react-relay"
import { router } from './router'

function App() {
  return (
    <>
      <RelayEnvironmentProvider environment={environment}>
          <RouterProvider router={router} />
          <Toaster />
      </RelayEnvironmentProvider>
    </>
  )
}

export default App
