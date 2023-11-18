import React, { useEffect, useState } from 'react';
import './styles.css';
import Image from 'next/image';


export default function LoadingDialog() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll'
        };
    }, []);

    const [currentStep, setCurrentSteo] = useState(0);

    const steps = [
        { name: 'Crafting your unique key' },
        { name: 'Securing your Memento' },
        { name: 'Uploading your Memento for safekeeping' },
        { name: 'Confirming in wallet' },
        { name: 'Your Memento is ready! Keep the link safe!' }
    ]

    return (
        <>
            <div className='shadow' />
            <div className='dialog'>
                <Image
                    alt='logo-small'
                    src='logo-small.svg'
                    width={100}
                    height={100}
                />
                <div className='flex gap-2 font-light border border-fg rounded-[12px] px-[14px] py-[10px] max-w-[560px] mb-4'>
                    <Image
                        alt='info'
                        src='info.svg'
                        width={16}
                        height={16}
                    />
                    <div className='ml-[8px]'>
                        Just a moment, this may take a little while. Please don’t close or refresh the page, it'll stop your note from being sent.
                    </div>
                </div>
                <ul className='flex flex-col gap-[8px] list-disc text-xl'>
                    {steps.map((step, id) => (
                        <li
                            key={step.name}
                            className={id <= currentStep ? ' ' : ' text-watermark'}
                        >
                            {step.name}{currentStep === id ? '...' : ''}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
