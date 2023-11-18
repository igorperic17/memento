import Image from 'next/image';
import React from 'react';
import './styles.css';

export default function Main() {
    return (
        <div className='flex flex-col font-light items-center max-w-[1050px] text-center mt-[36px]'>
            <div>
                <Image
                    alt='memento-logo'
                    src='logo.svg'
                    className='logo'
                    width={185}
                    height={236}
                />
                <h1 className='logoTitle'>memento</h1>
            </div>
            <h2 className='mt-[67px] text-2xl'>Welcome to Memento, where you can send messages in your own special way.</h2>
            <h2 className='mt-[53px] text-2xl'>
                <b>Choose when and how your words get to people,</b> whether it's for a future date, a certain place, or other reasons.
                Make lasting memories, set reminders, or keep special moments safe. It's easy and flexible with Memento. Start writing to friends, family, or even yourself :)
            </h2>
        </div>
    )
}
