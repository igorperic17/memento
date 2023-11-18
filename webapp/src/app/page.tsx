'use client'

import { useState } from 'react'

import Header from '@/components/Header/Header'
import Main from '@/components/Main/Main'
import CreateMementoForm from '@/components/CreateMementoForm/CreateMementoForm'
import MementoBox from '@/components/MementoBox/MementoBox'

import { Memento, uploadMemento } from '@/services/memento'
import { useContract } from '@/services/contract'
import LoadingDialog from '@/components/CreateMementoForm/LoadingDialog/LoadingDialog'

// Before starting run ETH Node with: npm run evm-node
// Then deploy contract locally with: npm run deploy-contract
// Add address output to env

// Setup local metamask
// RPC_URL: http://127.0.0.1:8545/
// CHAIN_ID: 31337
// Import first account into Metamask from run eth-node output

export default function Home() {
  const [page, setPage] = useState('view')

  const [currentStep, setCurrentStep] = useState(0);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const { getContract } = useContract();

  const createMemento = async (memento: Memento, date: Date) => {
    setShowCreateDialog(true);
    const pwd = Math.round(Math.random() * 1e8).toString();
    setPwd(pwd);
    const cid = await uploadMemento(memento, pwd)
    setCurrentStep(3)

    const contract = getContract()
    const id = new Date().getTime()
    setId(id.toString());

    await contract.create(id, cid, date!.getTime(), { value: 100 }).then((t) => t.wait())

    setCurrentStep(5);
  };

  return (
    <>
      <Header page={page} setPage={setPage} />

      <main className="flex min-h-screen flex-col items-center gap-8 max-w-[1400px] mx-auto px-4 pb-16">
        <Main />

        <CreateMementoForm onCreate={createMemento} />

        {showCreateDialog &&
          <LoadingDialog
            currentStep={currentStep}
            onClose={() => { setShowCreateDialog(false); setId(''); setPwd(''); }}
            link={global.window ? `${window.location.host}/${id}` : id}
            password={pwd}
          />
        }

        <MementoBox />
      </main>
    </>
  )
}
