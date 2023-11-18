import React from "react";
import Image from 'next/image';


type UploadFileProps = {
    files?: File[];
    setFiles: (files?: File[]) => void;
};

export default function UploadFile({ files, setFiles }: UploadFileProps) {
    return (
        <div
            className={
                'max-w-[572px] w-full border rounded-[20px] border-border h-[470px] transition-colors hover:border-fg'
                + `${files?.length ? ' border-fg' : ''}`}
        >
            <label
                htmlFor='upload'
                className='w-full h-full flex justify-center items-center cursor-pointer'
                onDrop={e => {
                    e.preventDefault();
                    if (e.dataTransfer.items?.length) {
                        let filesList = [];
                        const dT = new DataTransfer();
                        setFiles(Array.from(e.dataTransfer.files));
                    }
                }}
            >
                <input
                    id='upload'
                    className='display-none hidden'
                    type='file'
                    onChange={e => e.target.files?.length && setFiles(Array.from(e.target.files))}
                />

                <div className='flex flex-col text-center gap-4'>
                    {!files?.length ? (
                        <Image alt='draganddrop' src='draganddrop.svg' width={218} height={107} />
                    ) : (
                        <div className='text-2xl flex flex-col gap-1'>
                            <div className='font-bold mb-1'>Uploaded:</div> {files.map(f => <div key={f.name}>{f.name}</div>)}
                        </div>
                    )}
                </div>
            </label>
        </div>
    );
}
