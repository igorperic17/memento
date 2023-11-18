export async function encryptString(str: string, cryptoKey: CryptoKey) {
  const iv = window.crypto.getRandomValues(new Uint8Array(16))
  const encoded = new TextEncoder().encode(str)

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    cryptoKey, // from generateCryptoKey
    encoded
  )

  const encryptedArray = new Uint8Array(encrypted)
  const combined = new Uint8Array(iv.length + encryptedArray.length)
  combined.set(iv)
  combined.set(encryptedArray, iv.length)

  return btoa(String.fromCharCode(...Array.from(combined)))
}

export async function decryptString(encryptedStr: string, cryptoKey: CryptoKey) {
  const combined = Uint8Array.from(atob(encryptedStr), (c) => c.charCodeAt(0))
  const iv = combined.slice(0, 16)
  const encrypted = combined.slice(16)

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    cryptoKey,
    encrypted
  )

  return new TextDecoder().decode(decrypted)
}

export async function deriveCryptoKey(passphrase: string) {
  const enc = new TextEncoder()
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('a-unique-salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
}
