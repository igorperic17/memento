import React, { FormEvent, useState } from 'react';
import InputField from '../InputField/InputField';
import UploadFile from './UploadFile/UploadFile';
import Button from '../Button/Button';
import { Memento, emptyMemento, uploadMemento } from '@/services/memento';
import { BrowserProvider } from 'ethers';
import { useAccount } from 'wagmi';
import { Memento__factory } from '../../../contract/typechain-types';
import moment from 'moment';


export default function CreateMementoForm() {
    const [memento, setMemento] = useState<Memento>(emptyMemento);
    // const [trigger, setTrigger] = useState('');
    const { address } = useAccount();
    const [date, setDate] = useState<Date>();

    const getContract = async () => {
        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner(address);

        const contract = Memento__factory.connect(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, signer);
        return { contract, signer };
    }

    const createMemento = async () => {
        if (date) {
            const cid = await uploadMemento(memento, 'pwd');

            const { contract, signer } = await getContract();
            const id = new Date().getTime();

            await contract.create(
                id,
                cid,
                date!.getTime()
            ).then((t) => t.wait());

            alert(`Crated memento with id ${id}`);
        }
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        createMemento();
    };

    const handleChange = (field: keyof Memento) => (value: any) => {
        setMemento({ ...memento, [field]: value });
    }

    const isEnabled = memento.title && memento.description && memento.files.length && date;

    return (
        <form className='w-full transition-colors duration-300' onSubmit={onSubmit}>
            <h3 className='text-2xl font-light mb-[8px]'>Step1. Write a memento to someone</h3>
            <div className='flex gap-[20px]'>
                <div className='max-w-[800px] w-full border border-border rounded-[20px] h-[470px] py-[24px] px-[42px] text-2xl transition-colors duration-300 hover:border-fg'>
                    <InputField value={memento.title} setValue={handleChange('title')} placeholder='Enter a subject' />

                    <textarea
                        value={memento.description}
                        className='mt-2 outline-none pb-1 bg-bg w-full placeholder:text-watermark h-[380px] max-h-[380px] resize-none'
                        placeholder='To...'
                        onChange={e => handleChange('description')(e.target.value)}
                    />
                </div>

                <UploadFile files={memento.files} setFiles={handleChange('files')} />
            </div>

            <div className='w-full mt-4 gap-[20px] flex text-2xl'>
                <div className='h-[180px] max-w-[572px] w-full px-[42px] py-[32px] pt-[48px] border border-border rounded-[20px] flex flex-col transition-colors duration-300 hover:border-fg'>
                    Seal this memento until...
                    <input type='datetime-local' className='mt-4 bg-bg' onChange={e => setDate(new Date(e.target.value))} />
                </div>
                <div className='flex h-[180px] pl-[42px] w-full border border-border rounded-[20px] text-2xl transition-colors duration-300 hover:border-fg'>
                    <div className='grid grid-cols-2 gap-x-[20px] my-auto gap-y-[8px]'>
                        {/* <div>Date to unseal: </div><div>{date?.toLocaleString() ?? '-'}</div> */}
                        <div>Available: </div><div>{date ? moment(date).fromNow() : '-'}</div>
                        <div>Delivery fee: </div><div>0.003 ETH</div>
                    </div>
                    <Button
                        type='submit'
                        classes='w-full text-2xl px-[190px] h-full max-w-[312px] ml-auto rounded-l-[0px]'
                        disabled={!isEnabled}
                    >
                        Sign & Seal
                    </Button>
                </div>
            </div>

            {/* <SelectTrigger trigger={trigger} setTrigger={setTrigger} /> */}
        </form>
    );
}
