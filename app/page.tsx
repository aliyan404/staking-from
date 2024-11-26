'use client'
import { Navbar } from '@/components/navbar'
import { CenteredForm } from '@/components/form'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <CenteredForm />
      </main>
    </div>
  )
}
