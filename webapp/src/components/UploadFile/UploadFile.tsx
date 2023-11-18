import React, { useState } from "react";
import { NFTStorage, File } from 'nft.storage';
import Image from 'next/image';


export default function UploadFile() {
    const [file, setFile] = useState<File>();

    const onUpload = () => {
        const upload = async () => {
            const name = '';
            const description = '';

            if (file) {
                const storage = new NFTStorage({ token: process.env.NEXT_PUBLIC_STORAGE_KEY! });

                return storage.store({
                    image: file,
                    name,
                    description,
                }).then(c => console.log(c));
            }
        }
        upload();
    };

    return (
        <div className='max-w-[572px] w-full border rounded-[20px] border-border h-[470px] flex justify-center items-center'>
            <label htmlFor='upload'>
                <input
                    id='upload'
                    className='display-none hidden'
                    type='file'
                    onChange={e => e.target.files?.length && setFile(e.target.files[0])}
                />
                <Image alt='draganddrop' src='draganddrop.svg' width={218} height={107} />
            </label>
        </div>
    );
}
