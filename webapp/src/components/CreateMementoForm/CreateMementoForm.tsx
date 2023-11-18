import React, { FormEvent, useState } from 'react'
import InputField from '../InputField/InputField'
import UploadFile from './UploadFile/UploadFile'
import Button from '../Button/Button'

import { Memento, emptyMemento } from '@/services/memento'

import moment from 'moment'

export default function CreateMementoForm({
  onCreate,
}: {
  onCreate: (_: Memento, date: Date) => void
}) {
  const [memento, setMemento] = useState<Memento>(emptyMemento)
  const [date, setDate] = useState<Date>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    onCreate(memento, date)
  }

  const handleChange = (field: keyof Memento) => (value: any) => {
    setMemento({ ...memento, [field]: value })
  }

  const isEnabled = memento.title && memento.description && memento.files.length && date

  return (
    <form id="send" className="w-full transition-colors duration-300 mt-[40px]" onSubmit={onSubmit}>
      <h3 className="text-3xl font-light mb-[18px] capitalize text-center">
        Write a memento to someone
      </h3>
      <div className="flex gap-[20px]">
        <div className="max-w-[800px] w-full border border-border rounded-[20px] h-[470px] py-[24px] px-[42px] text-2xl transition-colors duration-300 hover:border-fg">
          <InputField
            value={memento.title}
            setValue={handleChange('title')}
            placeholder="Give this Memento a name"
          />

          <textarea
            value={memento.description}
            className="mt-2 outline-none pb-1 bg-bg w-full placeholder:text-watermark h-[380px] max-h-[380px] resize-none"
            placeholder="Write down anything that you want to say..."
            onChange={(e) => handleChange('description')(e.target.value)}
          />
        </div>

        <UploadFile files={memento.files} setFiles={handleChange('files')} />
      </div>

      <div className="w-full mt-4 gap-[20px] flex text-2xl">
        <div className="h-[180px] max-w-[572px] w-full px-[42px] py-[32px] pt-[48px] border border-border rounded-[20px] flex flex-col transition-colors duration-300 hover:border-fg">
          Seal this memento until...
          <input
            type="datetime-local"
            className="mt-4 bg-bg"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <div className="flex h-[180px] pl-[42px] w-full border border-border rounded-[20px] text-2xl transition-colors duration-300 hover:border-fg">
          <div className="grid grid-cols-2 gap-x-[20px] my-auto gap-y-[8px]">
            {/* <div>Date to unseal: </div><div>{date?.toLocaleString() ?? '-'}</div> */}
            <div>Available: </div>
            <div>{date ? moment(date).fromNow() : '-'}</div>
            <div>Delivery fee: </div>
            <div>0.003 ETH</div>
          </div>
          <Button
            type="submit"
            classes="w-full text-2xl px-[190px] h-full max-w-[312px] ml-auto rounded-l-[0px]"
            disabled={!isEnabled}
          >
            Sign & Seal
          </Button>
        </div>
      </div>

      {/* <SelectTrigger trigger={trigger} setTrigger={setTrigger} /> */}
    </form>
  )
}
