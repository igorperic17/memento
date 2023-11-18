import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import UploadFile from './UploadFile/UploadFile';
import { NFTStorage } from 'nft.storage';
import Button from '../Button/Button';

export default function CreateMementoForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState<FileList>();

    const onSubmit = () => {
    //     const upload = async () => {
    //         const name = '';
    //         const description = '';

    //         if (file) {
    //             const storage = new NFTStorage({ token: process.env.NEXT_PUBLIC_STORAGE_KEY! });

    //             return storage.store({
    //                 image: file,
    //                 name,
    //                 description,
    //             }).then(c => console.log(c));
    //         }
    //     }
    //     upload();
    };

    return (
        <form className='w-full' onSubmit={onSubmit}>
            <h3 className='text-2xl font-light mb-[8px]'>Step1. Write a memento to someone</h3>
            <div className='flex gap-[20px]'>
                <div className='max-w-[800px] w-full border border-border rounded-[20px] h-[470px] py-[24px] px-[42px] text-2xl'>
                    <InputField value={name} setValue={setName} placeholder='Enter a subject' />

                    <textarea
                        value={message}
                        className='mt-2 outline-none pb-1 bg-bg w-full placeholder:text-watermark h-[380px] max-h-[380px] resize-none'
                        placeholder='To...'
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>

                <UploadFile files={files} setFiles={setFiles} />
            </div>

            <div className='w-full max-w-[450px] ml-auto mt-4 px-1'>
                <Button
                    type='submit'
                    classes='w-full text-2xl px-[190px] py-[90px] w-fit'
                >
                    Next
                </Button>
            </div>
        </form>
    );
}
