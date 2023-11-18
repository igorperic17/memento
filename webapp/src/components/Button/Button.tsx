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
                'bg-primary px-6 py-2 text-white rounded-[20px] transition-colors '
                + 'hover:bg-primary-hover disabled:bg-disabled'
                + (classes ? ` ${classes}` : '')
            }
        >
            {children}
        </button>
    );
}
