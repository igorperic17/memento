import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import { Web3ModalProvider } from '../context/WalletProvider/WalletProvider'

const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memento',
  description: 'Memento is a dapp for storing private content on a public blockchain to be unlocked in the future. Powered by a novel EVM time-locking privacy protocol built from scratch in ETHGlobal Istanbul.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}
