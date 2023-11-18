import React, { useState } from 'react';
import Image from 'next/image';
import InputField from '../InputField/InputField';
import UploadFile from '../UploadFile/UploadFile';

export default function CreateMementoForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File>();

    return (
        <div className='w-full'>
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

                <UploadFile />
            </div>
        </div>
    );
}
