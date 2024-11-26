import { Contract } from 'starknet'
import { getRpcProvider } from './provider'
import toast from 'react-hot-toast'
import { ABIFile } from '../static/ABIFile'

export type CallbackReturnType = {
  functionName: string
  inputs: any[]
  outputs: any[]
}

export async function write(
  value: CallbackReturnType,
  address: string,
  account?: any
) {
  const rpcProvider = getRpcProvider()
  const abi = ABIFile
  const contract = new Contract(abi!, address, rpcProvider)

  if (!account) {
    toast.error('Please connect your wallet')
    return
  }

  contract.connect(account)
  const tx_res = await contract.invoke(value.functionName, value.inputs)
  const tx_hash = tx_res?.transaction_hash

  const res = await rpcProvider.waitForTransaction(tx_hash)

  return res?.value
}
