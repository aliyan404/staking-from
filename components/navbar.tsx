import Link from 'next/link'
import ConnectModel from '@/app/component/connect-model'

export function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <ConnectModel />
          </div>
        </div>
      </div>
    </nav>
  )
}
