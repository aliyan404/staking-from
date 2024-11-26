'use client'

import { StarknetProvider } from '@/components/starknet-provider'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StarknetProvider>
      {children}
      <Toaster
        toastOptions={{
          className: 'toast',
        }}
      />
    </StarknetProvider>
  )
}
