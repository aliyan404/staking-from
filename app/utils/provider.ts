import { RpcProvider } from 'starknet'

export function getRpcProvider() {
  const rpcProvider = new RpcProvider({
    nodeUrl:
      'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/WBnHOmwS6g5-z7JgnqsrxTi8GL9H1YBk',
  })
  return rpcProvider
}
