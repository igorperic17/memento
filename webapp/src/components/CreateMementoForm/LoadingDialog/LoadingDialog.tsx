import React, { useEffect, useState } from 'react';
import './styles.css';
import Image from 'next/image';
import CopyButton from './CopyButton/CopyButton';
import Button from '@/components/Button/Button';


type LoadingDialogProps = {
    currentStep: number;
    onClose: () => void;
    link?: string;
    password?: string;
};

export default function LoadingDialog({ currentStep, onClose, link, password }: LoadingDialogProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll'
        };
    }, []);

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
                <ul className='progressList flex flex-col gap-[8px] list-disc text-xl pb-2'>
                    {steps.map((step, id) => (
                        <li
                            key={step.name}
                            className={
                                (id < currentStep ? ' completedOption' : ' text-watermark')
                                + (id === currentStep ? ' loadingOption' : '')
                            }
                        >
                            {step.name}...
                        </li>
                    ))}
                </ul>

                {currentStep >= steps.length - 1 && (
                    <div className='border-t border-fg w-full px-[36px]'>
                        <p className='mt-[21px] mb-[4px]'>
                            Link to Memento
                        </p>
                        <div className='bg-bg-alt rounded-[12px] h-[40px] relative'>
                            <p className='max-w-[330px] text-black mb-2 leading-[40px] px-4 truncate'>
                                {link}
                            </p>
                            <CopyButton copyContent={link ?? ''} />
                        </div>

                        <p className='mt-[21px] mb-[4px]'>
                            Password for the recipient
                        </p>
                        <div className='bg-bg-alt rounded-[12px] h-[40px] relative mb-[21px]'>
                            <p className='max-w-[330px] text-black mb-2 leading-[40px] px-4 truncate'>
                                {password}
                            </p>
                            <CopyButton copyContent={password ?? ''} />
                        </div>

                        <Button
                            classes='bg-primary-alt h-[59px] text-2xl font-light mx-[110px] w-[189px]'
                            onClick={onClose}
                        >Done!
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}


