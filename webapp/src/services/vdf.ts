export const getSeed = async (secret: string) => {
  const { result } = await fetch('http://localhost:8080/forward', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x: secret, e: '3', m: '1000000007', steps: 1000000 }),
  }).then((t) => t.json())

  return result as string
}

export const unlockSecret = async (seed: string) => {
  const { result } = await fetch('http://localhost:8080/backward', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x: seed, e: '3', m: '1000000007', steps: 1_000_000 }),
  }).then((t) => t.json())

  return result as string
}
