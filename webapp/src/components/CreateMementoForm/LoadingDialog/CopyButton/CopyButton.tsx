import React, { useState } from 'react';


export default function CopyButton({ copyContent }: { copyContent: string }) {
    const [clicked, setIsClicked] = useState(false);

    return (
        <button
            className={
                'bg-primary w-[84px] h-[40px] text-black rounded-r-[12px] transition-colors ease-in-out duration-300 hover:bg-[#fff]'
                + ' absolute top-[0px] right-[0px]'
            }
            onClick={() => { navigator.clipboard.writeText(copyContent); setIsClicked(true); }}
        >
            {!clicked ? 'Copy' : 'Copied'}
        </button>
    )
}
