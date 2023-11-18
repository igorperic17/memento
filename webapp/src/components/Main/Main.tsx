import Image from 'next/image';
import React from 'react';
import './styles.css';
import Button from '../Button/Button';

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
            <h2 className='mt-[16px] text-2xl'>Welcome to Memento, where your messages travel through time!</h2>
            <h2 className='mt-[53px] text-2xl mb-[36px]'>
                Here, you can write messages, attach files, and <b>choose when the notes get to loved ones.</b>&nbsp;
                Send a birthday message for later, a reminder, or keep a memory safe. Start sending notes to friends, family, or even to yourself in a fun new way :)
            </h2>
            <a href='#send'>
                <Button classes='text-2xl px-[34px]'>
                    Write A Memento
                </Button>
            </a>
        </div>
    )
}
