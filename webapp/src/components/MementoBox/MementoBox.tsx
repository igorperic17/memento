import React, { useEffect, useState } from 'react'
import { Memento, Memento__factory } from '../../../contract/typechain-types'
// import { BrowserProvider } from 'ethers'
import {} from '@web3modal/ethers5/react'

import Image from 'next/image'

export default function MementoBox() {
  const [boxes, setBoxes] = useState<Memento.BoxStructOutput[]>([])
  //   const { address } = useAccount()
  const address = ''

  const getContract = async () => {
    const provider = new BrowserProvider((window as any).ethereum)
    const signer = await provider.getSigner()

    const contract = Memento__factory.connect(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, signer)
    return { contract, signer }
  }

  useEffect(() => {
    const loadMementoes = async () => {
      const { contract, signer } = await getContract()
      const events = await contract.queryFilter(contract.getEvent('MementoCreated'))

      const ids = events.map((t) => t.args.id)

      const mementoes = await Promise.all(ids.map((t) => contract.getMemento(t)))
      setBoxes(mementoes)
    }

    loadMementoes()
  }, [address])

  // const boxes = Array.from({ length: 10 }).map((_, id) => ({
  //     title: 'title' + id,
  //     mementoCid: id
  // }));

  return (
    <section id="box" className="w-full mt-[40px]">
      <h3 className="text-3xl font-light mb-[18px] capitalize text-center">Memento Box</h3>
      <div className="w-full border border-border rounded-[20px] py-[26px] px-[42px]">
        {boxes.length ? (
          <table className="w-full">
            <tr className="text-watermark text-2xl font-medium">
              <td>Title</td>
              <td>Date Sent</td>
              <td>Date to Unseal</td>
              <td>Total Duration</td>
              <td>Countdown</td>
            </tr>
            <tbody>
              {boxes.map((box) => (
                <tr key={`row-${box.mementoCid}`}>
                  <td>{box.mementoCid}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <a
            href="#send"
            className="flex flex-col items-center justify-center text-2xl text-watermark"
          >
            <Image alt="memento-box" src="box.svg" width={70} height={70} />
            Send your first Memento!
          </a>
        )}
      </div>
    </section>
  )
}
