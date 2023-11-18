'use client'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { localhost } from 'viem/chains'


const projectId = '6303751cde71dbfb1e1696e3421b8db6';
const metadata = {
    name: 'memento',
    description: 'memento'
};

const chains = [localhost];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function WalletProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            {children}
        </WagmiConfig>
    );
}
