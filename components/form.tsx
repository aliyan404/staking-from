import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip'
import { getFunction } from '@/app/utils/function'
import { ABIFile } from '@/app/static/ABIFile'
import { useEffect, useState } from 'react'
import { CallbackReturnType, write } from '@/app/utils/contract'
import { contractAddress } from '@/app/static'
import { useAccount } from '@starknet-react/core'

export function CenteredForm() {
  const [fnMsg, setFnMsg] = useState<any>(null)
  const [inputValues, setInputValues] = useState<any>({})
  const [result, setResult] = useState<any>('')
  const { account } = useAccount()

  useEffect(() => {
    const func = getFunction(ABIFile)
    console.log('staking', func)
    setFnMsg(func)
  }, [fnMsg])

  const handleChange = (e: any) => {
    console.log('Input changed:', e.target.name, e.target.value)
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddDecimals = (inputName: string) => {
    const currentValue = inputValues[inputName] || ''

    const valueAsBigInt = BigInt(Math.floor(parseFloat(currentValue) * 1e18))
    const newValue = valueAsBigInt.toString()
    setInputValues({
      ...inputValues,
      [inputName]: newValue,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const inputs = fnMsg?.inputs.map((value: any) => inputValues[value.name])
    const outputs = fnMsg?.outputs

    const callback: CallbackReturnType = {
      functionName: fnMsg?.name,
      inputs: inputs,
      outputs: outputs,
    }
    const res = await write(callback, contractAddress, account)
    console.log('Write result:', res)
    setResult(res)
  }
  return (
    <div className="font-bold p-4 bg-zinc-700 shadow-lg rounded-lg">
      <div className="mb-2">{fnMsg?.name}()</div>
      <form onSubmit={handleSubmit}>
        <div className="felx flex-col space-y-2">
          {fnMsg?.inputs?.map((input: any, index: any) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium">{input.name}:</span>
                <span>({input.type})</span>
              </div>
              <div className="relative">
                <Input
                  required
                  placeholder={input.name}
                  name={input.name}
                  value={inputValues[input.name] || ''}
                  onChange={handleChange}
                  className="w-full"
                />
                {input.type === 'core::integer::u256' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={() => handleAddDecimals(input.name)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-s bg-transparent hover:bg-transparent border-none"
                        >
                          *
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        <p className="text-sm text-gray-500">
                          Multiply by 1e18
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button type="submit">Write</Button>
        </div>
      </form>
    </div>
  )
}
