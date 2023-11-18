import { formatAddress } from '@/utils/formatAddress'
import { useWeb3Modal, useDisconnect, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import React, { useState } from 'react'

export default function Header({
  page,
  setPage,
}: {
  page: string
  setPage: (page: string) => void
}) {
  const items = [
    { name: 'Send a Memento', page: 'send' },
    { name: 'Memento Box', page: 'box' },
    { name: 'Contact Us', page: 'contact' },
  ]
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()

  const { address } = useWeb3ModalAccount()

  const [showDisconnect, setShowDisconnect] = useState(false)

  return (
    <div className="w-full py-[10px]">
      <div className="flex w-fit flex h-[55px] mr-auto pl-[30px] gap-8 items-center gap-[32px] text-2xl">
        {items.map((item) => (
          <a
            key={`${item.page}`}
            href={`#${item.page}`}
            className={`cursor-pointer h-full leading-[55px] transition-colors border-b ${page === item.page ? 'border-border' : 'border-bg'
              }`}
            onClick={() => setPage(item.page)}
          >
            {item.name}
          </a>
        ))}

        <div
          className="absolute right-[20px] top-[20px]"
          onMouseLeave={() => setShowDisconnect(false)}
        >
          {address ? (
            <div
              className={
                'h-[53px] text-xl px-[34px] py-[8px] rounded-[100px] flex items-center text-xl border border-border' +
                ' transition-colors duration-300 hover:bg-bg-hover hover:border-primary'
              }
              onClick={() => setShowDisconnect(true)}
              onMouseOver={() => setShowDisconnect(true)}
            >
              {formatAddress(address)}
            </div>
          ) : (
            <button
              className={
                'bg-primary w-[202px] h-[53px] text-xl px-[34px] py-[8px] rounded-[20px] flex items-center font-medium' +
                ' cursor-pointer transition-colors duration-300 hover:bg-fg hover:text-primary'
              }
              onClick={() => {
                open().then(console.log.bind(null, 23))
              }}
            >
              Connect Wallet
            </button>
          )}

          {showDisconnect && (
            <div
              className={
                'h-[53px] text-xl px-[34px] py-[8px] rounded-[100px] flex items-center text-xl border border-border justify-center relative top-[8px]' +
                ' cursor-pointer transition-colors duration-300 hover:bg-bg-hover hover:border-primary'
              }
              onClick={() => { disconnect(); setShowDisconnect(false); }}
            >
              Disconnect
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
