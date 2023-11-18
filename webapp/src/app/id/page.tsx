'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import EnterPassword from './EnterPassword/EnterPassword';

export default function MementoView() {
    const [step, setStep] = useState(0);

    return (
        <div className='w-full px-[20px] h-[100vh] mx-auto flex flex-col items-center justify-center'>
            <Image alt='memento-logo' src='logo.svg' width={185} height={236} />

            <h2 className='text-3xl text-center font-light mt-[12px]'>
                {step === 0 && 'Here is Your Memento.'}
                {step === 1 && 'Enter the password to unseal the Memento.'}
                {step === 2 && 'Unsealing the Memento...'}
            </h2>
            {(step === 0 || step === 1) && (
                <div className='w-full border border-border rounded-[20px] mt-[44px] py-[31px] px-[42px] mb-[36px]'>
                    <table className='w-full'>
                        <tr className='text-watermark text-2xl font-medium h-[60px]'>
                            <td>Title</td>
                            <td>Date Sent</td>
                            <td>Date to Unseal</td>
                            <td>Total Duration</td>
                            <td>Countdown</td>
                        </tr>
                        <tbody>
                            <tr className='h-[60px]'>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {step === 0 &&
                <button
                    className={
                        'text-xl rounded-full w-[105px] px-[21px] py-[13px] align-center bg-primary-alt text-watermark rounded-full transition-colors ease-in-out duration-300 '
                        + 'hover:bg-primary hover:text-primary-400 disabled:bg-disabled disabled:text-fg-disabled'
                    }
                    onClick={() => setStep(1)}
                >
                    Unseal
                </button>
            }
            {step === 1 &&
                <EnterPassword />
            }
        </div>
    )
}
