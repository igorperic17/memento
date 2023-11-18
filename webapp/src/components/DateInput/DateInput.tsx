import React from 'react';
import InputField from '../InputField/InputField';

type DateInputProps = {
    date: { day: string, month: string, year: string };
    setDate: (val: DateInputProps['date']) => void;
};

export default function DateInput({ date, setDate }: DateInputProps) {
    const handleDateInput = (field: keyof typeof date) => (value: string) => {
        setDate({ ...date, [field]: value });
    };

    return (
        <div className='flex gap-[40px] mt-[20px] w-full justify-center'>
            <InputField
                placeholder='DD'
                value={date.day}
                setValue={handleDateInput('day')}
                classes='text-center w-[108px] border-fg'
            />
            <InputField
                placeholder='MM'
                value={date.month}
                setValue={handleDateInput('month')}
                classes='text-center w-[108px] border-fg'
            />
            <InputField
                placeholder='YYYY'
                value={date.year}
                setValue={handleDateInput('year')}
                classes='text-center w-[108px] border-fg'
            />
        </div>
    );
}
