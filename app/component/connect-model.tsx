'use client'
import { useAccount, useConnect} from '@starknet-react/core'
import { useStarknetkitConnectModal } from 'starknetkit'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { DisConnectModel } from './disconnect-model'

export default function ConnectModel() {
  const { connect, connectors } = useConnect()
  const { address } = useAccount()
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
    modalTheme: 'light',
  })
  const [isLoading, setIsLoading] = useState(false)

  const buttonClasses =
    'bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const { connector } = await starknetkitConnectModal()

      await connect({ connector })
    } catch (error) {
      toast.error('Failed to connect wallet', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (address) {
    return <DisConnectModel />
  }

  return (
    <>
      {isLoading ? (
        <Button
          disabled
          className={`${buttonClasses} opacity-50 cursor-not-allowed`}
        >
          Connecting...
        </Button>
      ) : (
        <Button onClick={handleConnect} className={buttonClasses}>
          Connect Wallet
        </Button>
      )}
    </>
  )
}
