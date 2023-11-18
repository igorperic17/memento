import { Contract } from 'ethers'
import def from './Memento.json'
import { useRef } from 'react'
import { useWeb3ModalSigner } from '@web3modal/ethers5/react'

export const useContract = () => {
  const contractRef = useRef<Contract>()
  const { signer } = useWeb3ModalSigner()

  const getContract = (): Contract => {
    if (contractRef.current) return contractRef.current
    contractRef.current = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, def.abi, signer)
    return contractRef.current
  }

  return { getContract }
}
