import React from 'react';

type InputFieldProps = {
    value: string;
    setValue: (val: string) => void;
    placeholder?: string;
}
export default function InputField({ value, setValue, placeholder }: InputFieldProps) {
    return (
        <input
            className='outline-none pb-1 bg-bg border-border border-b w-full placeholder:text-watermark'
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
        />
    );
}
