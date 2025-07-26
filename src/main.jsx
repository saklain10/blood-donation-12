
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import mainRoutes from './Routers/mainRoutes.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client for React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={mainRoutes} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
