import React, { useState } from "react";
import Button from "../Button/Button";
import { NFTStorage, File } from 'nft.storage';


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
        <div className='p-6 border border-primary w-fit rounded-[20px] flex flex-col gap-6'>
            <label>Upload file</label>
            <input type='file' onChange={e => e.target.files?.length && setFile(e.target.files[0])} />

            <Button onClick={onUpload}>Upload</Button>
        </div>
    );
}
