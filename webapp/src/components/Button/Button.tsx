import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    classes?: string;
}

export default function Button(props: ButtonProps) {
    const { classes, children, ...extraProps } = props;

    return (
        <button
            {...extraProps}
            className={
                'bg-primary-400 px-[64px] py-[12px] text-white rounded-[20px] transition-colors ease-in-out duration-300 '
                + 'hover:bg-primary hover:text-primary-400 disabled:bg-disabled disabled:text-fg-disabled'
                + (classes ? ` ${classes}` : '')
            }
        >
            {children}
        </button>
    );
}
