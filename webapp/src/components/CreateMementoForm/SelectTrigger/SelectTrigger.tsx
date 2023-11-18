import React from 'react';

type SelectTriggerProps = {
    trigger: string;
    setTrigger: (val: string) => void;
};

export default function SelectTrigger({ trigger, setTrigger }: SelectTriggerProps) {
    const options = [
        { name: 'Time-Based', value: 'time' },
        { name: 'Wallet signature', value: 'signature' },
        { name: 'Location-Based', value: 'location' },
        { name: 'Email Check', value: 'email' },
        { name: 'Web3 Inbox check', value: 'web3inbox' },
        { name: 'Market Condition', value: 'market' },
    ]
    return (
        <div className='w-full'>
            <h3 className='text-2xl font-light mb-[8px]'>Step 2. Select an activation point</h3>
            <div className='grid grid-cols-3 gap-4 text-2xl'>
                {options.map(option => (
                    <div
                        className={
                            'h-[160px] flex items-center justify-center border border-border rounded-[20px]'
                            + ' transition-colors duration-300 hover:bg-bg-hover'
                            + (option.value === trigger ? ' bg-primary-400 font-bold hover:bg-primary-400 border-primary-400' : '')
                        }
                        key={`col-${option.value}`}
                        onClick={() => setTrigger(option.value)}
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
