import React, { useEffect, useState } from 'react';
import { Client, create } from '@web3-storage/w3up-client';


export default function FilesList({ client, setClient }: { client?: Client, setClient: (client: Client) => void }) {
    const [list, setList] = useState([] as any[]);

    useEffect(() => {
        if (!client) {
            const createClient = async () => {
                const newClient = await create();
                await newClient.login(process.env.STORAGE_EMAIL as any);
                await newClient.setCurrentSpace('did:key:z6MkexHcXaQobLk11uTbZfv978nStn6Q3hZEYRdrhenCcoRN');

                setClient(newClient);
            }

            createClient();
        }
    }, [client]);

    useEffect(() => {
        console.log(client?.agent.currentSpaceWithMeta())
    }, [client]);

    return (
        <div>


        </div>
    )
}
