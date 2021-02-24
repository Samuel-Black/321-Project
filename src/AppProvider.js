import React from 'react'
import { AuthProvider } from './libs/contextLib'

function AppProviders({children}) {
  return (
        <AuthProvider>
            {children}
        </AuthProvider>
  )
}

export default AppProviders
