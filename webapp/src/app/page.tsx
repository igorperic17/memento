// import { ethers } from 'hardhat'
import { useMemo } from 'react'
// import { Memento } from '../../contract/typechain-types'

// Before starting run ETH Node with: npm run eth-node
// Then deploy contract locally with: npm run deploy-contract
// Add address output bellow (LATER WILL BE IN ENV)
const CONTACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

// Setup local metamask
// RPC_URL: http://127.0.0.1:8545/
// CHAIN_ID: 31337
// Import first account into Metamask from run eth-node output

export default function Home() {
  const getContract = async () => {
    // const Memento = await ethers.getContractFactory('Memento')
    // const memento = Memento.attach(CONTACT_ADDRESS)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      App Will be here
    </main>
  )
}
