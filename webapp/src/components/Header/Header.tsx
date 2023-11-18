import React from 'react';

export default function Header({ page, setPage }: { page: string; setPage: (page: string) => void; }) {
    const items = [
        { name: 'Memento Box', page: 'view' },
        { name: 'Send a Memento', page: 'send' },
        { name: 'Contact Us', page: 'contact' }
    ];

    return (
        <div className='w-full py-[10px]'>
            <div className='flex w-fit flex h-[55px] mx-auto gap-8 items-center gap-[32px] text-2xl'>
                {items.map(item => (
                    <div
                        key={`${item.page}`}
                        className={
                            `cursor-pointer h-full leading-[55px] transition-colors border-b ${page === item.page ? 'border-border' : 'border-bg'}`
                        }
                        onClick={() => setPage(item.page)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
