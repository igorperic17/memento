'use client'

import { BrowserProvider } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { Memento } from '../../contract/typechain-types/Memento'
import { Memento__factory } from '../../contract/typechain-types'

// Before starting run ETH Node with: npm run eth-node
// Then deploy contract locally with: npm run deploy-contract
// Add address output bellow (LATER WILL BE IN ENV)
const CONTACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

// Setup local metamask
// RPC_URL: http://127.0.0.1:8545/
// CHAIN_ID: 31337
// Import first account into Metamask from run eth-node output

export default function Home() {
  const [boxes, setBoxes] = useState<Memento.BoxStructOutput[]>([])
  // TODO: memos, state, etc...

  const getContract = async () => {
    // TODO: Wallet Connect
    const provider = new BrowserProvider((window as any).ethereum)
    const signer = await provider.getSigner()

    const contract = Memento__factory.connect(CONTACT_ADDRESS, signer)
    return { contract, signer }
  }

  const createMemento = async () => {
    const { contract, signer } = await getContract()

    // Create. TODO: uuid
    const id = Date.now().toString()

    await contract
      .create(
        id,
        signer.address,
        new Uint8Array([123]),
        Date.now() + 1000,
        'example@will.be.encrypted.com'
      )
      .then((t) => t.wait())

    alert(`Crated memento with id ${id}`)
    loadMementoes()
  }

  const loadMementoes = async () => {
    const { contract, signer } = await getContract()
    const events = await contract.queryFilter(contract.getEvent('MementoCreated'))

    const ids = events.map((t) => t.args.id)

    const mementoes = await Promise.all(ids.map((t) => contract.getMemento(t)))
    setBoxes(mementoes)
  }

  useEffect(() => {
    loadMementoes()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      App Will be here
      <button className="bg-gray-200 p-5 m-3 rounded-md" onClick={createMemento}>
        Create Memento
      </button>
      <hr className="w-80" />
      <h2>Boxes</h2>
      {boxes.map((t) => (
        <div key={t.expiration_date} className="bg-gray-100 rounded-lg my-2 p-3">
          <div>Sender: {t.sender}</div>
          <div>Receiver: {t.sender}</div>
          <div>Memento: {t.memento}</div>
          <div>Email: {t.receiver_email}</div>
        </div>
      ))}
    </main>
  )
}
