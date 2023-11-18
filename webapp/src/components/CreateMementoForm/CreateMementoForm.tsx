import React, { FormEvent, useState } from 'react';
import InputField from '../InputField/InputField';
import UploadFile from './UploadFile/UploadFile';
import { NFTStorage } from 'nft.storage';
import Button from '../Button/Button';
import SelectTrigger from './SelectTrigger/SelectTrigger';
import { Memento, emptyMemento, uploadMemento } from '@/services/memento';
import { BrowserProvider } from 'ethers';
import { useAccount } from 'wagmi';
import { Memento__factory } from '../../../contract/typechain-types';

export default function CreateMementoForm() {
    const [memento, setMemento] = useState<Memento>(emptyMemento);
    // const [trigger, setTrigger] = useState('');
    const { address } = useAccount();

    const getContract = async () => {
        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner(address);

        const contract = Memento__factory.connect(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, signer);
        return { contract, signer };
    }

    const createMemento = async () => {
        const cid = await uploadMemento(memento, 'pwd')

        const { contract, signer } = await getContract();

        await contract.create(
            cid,
            signer.address,
            new Uint8Array([123]),
            Date.now() + 1000,
            'example@will.be.encrypted.com'
        ).then((t) => t.wait());

        alert(`Crated memento with id ${cid}`);
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        createMemento();
    };

    const handleChange = (field: keyof Memento) => (value: any) => {
        setMemento({ ...memento, [field]: value });
    }

    return (
        <form className='w-full' onSubmit={onSubmit}>
            <h3 className='text-2xl font-light mb-[8px]'>Step1. Write a memento to someone</h3>
            <div className='flex gap-[20px]'>
                <div className='max-w-[800px] w-full border border-border rounded-[20px] h-[470px] py-[24px] px-[42px] text-2xl'>
                    <InputField value={memento.title} setValue={handleChange('title')} placeholder='Enter a subject' />

                    <textarea
                        value={memento.description}
                        className='mt-2 outline-none pb-1 bg-bg w-full placeholder:text-watermark h-[380px] max-h-[380px] resize-none'
                        placeholder='To...'
                        onChange={handleChange('description')}
                    />
                </div>

                <UploadFile files={memento.files} setFiles={handleChange('files')} />
            </div>

            <div className='w-full max-w-[450px] ml-auto mt-4 px-2'>
                <Button
                    type='submit'
                    classes='w-full text-2xl px-[190px] py-[90px] w-fit'
                >
                    Sign & Seal
                </Button>
            </div>

            {/* <SelectTrigger trigger={trigger} setTrigger={setTrigger} /> */}
        </form>
    );
}
