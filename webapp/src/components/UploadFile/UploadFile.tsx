import React, { useState } from "react";
import Button from "../Button/Button";
import { Client, create } from "@web3-storage/w3up-client";


export default function UploadFile({ client, setClient }: { client?: Client, setClient: (client: Client) => void }) {
    const [file, setFile] = useState<File>();

    const onUpload = () => {
        const upload = async () => {
            if (file) {
                if (!client) {
                    const newClient = await create();
                    await newClient.login(process.env.STORAGE_EMAIL as any);
                    await newClient.setCurrentSpace('did:key:z6MkexHcXaQobLk11uTbZfv978nStn6Q3hZEYRdrhenCcoRN');

                    setClient(newClient);
                    const cid = await newClient.uploadFile(file);
                    return cid;
                } else {
                    const cid = await client.uploadFile(file);
                    return cid;
                }
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
