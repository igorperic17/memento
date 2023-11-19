'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import EnterPassword from './EnterPassword/EnterPassword'
import { useContract } from '@/services/contract'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { BigNumber } from 'ethers'
import { useParams } from 'next/navigation'
import moment from 'moment'
import { RawMemento, pullMemento } from '@/services/memento'
import { Spinner } from '@/components/Spinner/Spiner'
import { unlockSecret } from '@/services/vdf'

interface Item {
  expirationDate: Date
  mementoCid: string
  sender: string
}

moment.updateLocale('en', {
  relativeTime: {
    s: (number) => (number === 1 ? `${number} second` : `${number} seconds`),
  },
})

export default function MementoView() {
  const { id } = useParams()

  const [time, setTime] = useState(0)
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(0)
  const [item, setItem] = useState<Item>()
  const { getContract } = useContract()
  const { isConnected } = useWeb3ModalAccount()
  const [rawMemento, setRawMemento] = useState<RawMemento>()

  const loadMemento = async () => {
    const contract = getContract()
    const memento = await contract.getMemento(id)

    const expirationDate = new Date(memento.expirationDate.toNumber())
    const item: Item = { ...memento, expirationDate }

    setItem(item)
  }

  const canOpen = item && moment(item.expirationDate).isBefore(moment())

  const unseal = async () => {
    if (!item) return
    setStep(2)

    try {
      const memento = await pullMemento(item.mementoCid, password)

      setStep(3)
      setRawMemento(memento)
      console.log('Ready', memento)
    } catch {
      setStep(1)
      alert('Invalid password')
    }
  }

  const downloadFile = () => {
    if (!rawMemento || rawMemento.files.length == 0) return
    const file = rawMemento.files[0]

    const link = document.createElement('a')
    link.href = file.content
    link.download = file.name
    link.click()
  }

  useEffect(() => {
    if (canOpen) return

    const interval = setInterval(() => {
      setTime(Math.random())
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [canOpen])

  useEffect(() => {
    if (isConnected) loadMemento()
  }, [isConnected])

  useEffect(() => {
    unlockSecret('123')
  }, [])

  return (
    <div className="w-full px-[20px] h-[100vh] mx-auto flex flex-col items-center justify-center py-5">
      <Image alt="memento-logo" src="logo.svg" width={185} height={236} />

      <h2 className="text-3xl text-center font-light mt-[12px]">
        {step === 0 && 'Here is Your Memento.'}
        {step === 1 && 'Enter the password to unseal the Memento.'}
        {step === 2 && 'Unsealing the Memento...'}
        {step === 3 && 'Your Memento'}
      </h2>
      {(step === 0 || step === 1) && (
        <div className="w-full border border-border rounded-[20px] mt-[44px] py-[31px] px-[42px] mb-[36px]">
          <table className="w-full">
            <tbody>
              <tr className="text-watermark text-2xl font-medium h-[60px]">
                <td>Title</td>
                <td>Date Sent</td>
                <td>Date to Unseal</td>
                <td>Total Duration</td>
                <td>Countdown</td>
              </tr>
              <tr className="h-[60px]">
                <td>-</td>
                <td>-</td>
                <td>{item?.expirationDate.toLocaleString()}</td>
                <td>-</td>
                <td className="min-w-[100px]">
                  {canOpen && 'Ready To Open'}
                  {!canOpen && item && `Available ${moment(item?.expirationDate).fromNow()}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {step === 0 && (
        <button
          disabled={!canOpen}
          className={
            'text-xl w-[105px] px-[21px] py-[13px] align-center bg-primary text-fg rounded-full transition-colors ease-in-out duration-300 ' +
            'hover:bg-primary hover:text-primary-400 disabled:bg-disabled disabled:text-fg-disabled'
          }
          onClick={() => setStep(1)}
        >
          Unseal
        </button>
      )}
      {step === 1 && (
        <EnterPassword password={password} setPassword={setPassword} onSubmitPassword={unseal} />
      )}

      {step === 2 && (
        <div className="mt-10">
          <Spinner />
        </div>
      )}

      {/* Memento View */}
      {step === 3 && (
        <div className="flex-1 w-full max-w-7xl mt-4">
          <div>
            <span className="text-fg-disabled">From</span>
            <span className="ml-3">{item?.sender}</span>
          </div>

          <div className="flex gap-4 mt-5">
            <div className="border-border border rounded-[20px] px-10 py-6 flex-1">
              <div className="text-2xl font-light border-b border-border pb-2">
                {rawMemento?.title}
              </div>
              <div className="text-xl font-light mt-3">{rawMemento?.description}</div>
            </div>
            <div
              onClick={downloadFile}
              className="rounded-[20px] flex-1 bg-primary-alt flex flex-col items-center justify-center text-lg text-fg-disabled min-h-[400px] max-w-[300px] cursor-pointer hover:opacity-70 transition-all"
            >
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <path
                  d="M48.3881 26.25H43.7506V11.6667C43.7506 10.0625 42.4382 8.75 40.834 8.75H29.1673C27.5632 8.75 26.2507 10.0625 26.2507 11.6667V26.25H21.6132C19.0173 26.25 17.7048 29.4 19.5423 31.2375L32.9298 44.625C34.0673 45.7625 35.9048 45.7625 37.0423 44.625L50.4298 31.2375C52.2673 29.4 50.984 26.25 48.3881 26.25ZM14.584 55.4167C14.584 57.0208 15.8965 58.3333 17.5007 58.3333H52.5006C54.1048 58.3333 55.4173 57.0208 55.4173 55.4167C55.4173 53.8125 54.1048 52.5 52.5006 52.5H17.5007C15.8965 52.5 14.584 53.8125 14.584 55.4167Z"
                  fill="#F9F4FF"
                  fillOpacity="0.38"
                />
              </svg>
              Download the File
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
