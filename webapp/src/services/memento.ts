import { NFTStorage, File } from 'nft.storage'
import { decryptString, deriveCryptoKey, encryptString } from './crypto'
import { unlockSecret } from './vdf'

export interface Memento {
  title: string
  description: string
  files: File[]
}

export const emptyMemento: Memento = {
  title: '',
  description: '',
  files: [],
}

export interface RawMemento {
  title: string
  description: string
  files: { content: string; name: string }[]
}

const fileToBase64 = async (file: File): Promise<{ name: string; content: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve({ content: reader.result as string, name: file.name })
    reader.onerror = (error) => reject(error)
  })
}

export const packMemento = async (memento: Memento, password: string): Promise<File> => {
  const promises = memento.files.map((file) => fileToBase64(file))
  const base64Files = await Promise.all(promises)

  const pack = JSON.stringify({ ...memento, files: base64Files })

  const key = await deriveCryptoKey(password)
  const cypher = await encryptString(pack, key)

  return new File([cypher], 'memento')
}

export const uploadMemento = async (memento: Memento, password: string) => {
  const storage = new NFTStorage({ token: process.env.NEXT_PUBLIC_STORAGE_KEY! })

  const file = await packMemento(memento, password)
  const cid = await storage.storeBlob(file)

  console.log('cid', cid)
  return cid
}

export const ipfsURL = (cid: string) => `https://${cid}.ipfs.nftstorage.link/`

export const pullMemento = async (cid: string, password: string) => {
  const cypher = await fetch(ipfsURL(cid)).then((t) => t.text())

  const key = await deriveCryptoKey(password)
  const json = await decryptString(cypher, key)

  return JSON.parse(json) as RawMemento
}
