import Button from '@/components/Button/Button'
import React from 'react'
import Image from 'next/image'

type EnterPasswordProps = {
  password: string
  setPassword: (pwd: string) => void
  onSubmitPassword: () => void
}

export default function EnterPassword({
  password,
  setPassword,
  onSubmitPassword,
}: EnterPasswordProps) {
  return (
    <div className="flex gap-[10px]">
      <input
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        className="bg-bg outline-none border border-border rounded-[12px] h-[40px] w-[404px] px-4 focus:border-fg"
        placeholder="Enter your password"
      />
      <Button onClick={onSubmitPassword}>
        <Image alt="arrow-left" src="arrow-left.svg" width={21} height={16} />
      </Button>
    </div>
  )
}
