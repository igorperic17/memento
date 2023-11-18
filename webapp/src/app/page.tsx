'use client'

import { useState } from 'react'
import { Memento } from '../../contract/typechain-types/Memento'
import WalletProvider from '../context/WalletProvider/WalletProvider'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Button from '@/components/Button/Button'
import { useAccount, useDisconnect } from 'wagmi'
import { formatAddress } from '@/utils/formatAddress'
import Header from '@/components/Header/Header'
import Main from '@/components/Main/Main'
import CreateMementoForm from '@/components/CreateMementoForm/CreateMementoForm'

// Before starting run ETH Node with: npm run evm-node
// Then deploy contract locally with: npm run deploy-contract
// Add address output to env

// Setup local metamask
// RPC_URL: http://127.0.0.1:8545/
// CHAIN_ID: 31337
// Import first account into Metamask from run eth-node output


export default function Home() {
    const [boxes, setBoxes] = useState<Memento.BoxStructOutput[]>([])
    const [page, setPage] = useState('view');
    // TODO: memos, state, etc...
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();

    return (
        <WalletProvider>
            <Header page={page} setPage={setPage} />

            <main className="flex min-h-screen flex-col items-center gap-8 max-w-[1400px] mx-auto px-4">
                <Main />

                <CreateMementoForm />

                {address ? (
                    <>
                        <Button onClick={() => disconnect()}>Disconnect</Button>
                        <div>{address ? `Connected: ${formatAddress(address)}` : ''}</div>
                    </>
                ) : (
                    <Button onClick={() => open()}>Connect</Button>
                )}

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
        </WalletProvider>
    )
}
