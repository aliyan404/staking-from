import { Abi } from 'starknet'

export function getFunction(abi: Abi | undefined): any {
  if (!abi) return null

  const allFunctions = abi.flatMap((item: any) => {
    if (item.type === 'function') {
      return [item]
    } else if (item.type === 'interface') {
      return item?.items || []
    } else {
      return []
    }
  })

  const stakeFunction = allFunctions.find(
    (item: any) => item.type === 'function' && item.name === 'stake'
  )
  return stakeFunction
}
