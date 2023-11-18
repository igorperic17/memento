import React from 'react';

interface InputFieldProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
    value: string;
    setValue: (val: string) => void;
    classes?: string;
}
export default function InputField({ value, setValue, classes, ...extraProps }: InputFieldProps) {
    return (
        <input
            {...extraProps}
            className={
                'outline-none pb-1 px-1 bg-bg border-border border-b w-full placeholder:text-watermark'
                + (classes ? ` ${classes}` : '')

            }
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    );
}
