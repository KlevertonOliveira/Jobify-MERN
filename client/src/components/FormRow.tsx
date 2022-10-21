import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface FormRowProps {
  type: HTMLInputTypeAttribute;
  name: string;
  value: string;
  labelText: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function FormRow({
  type,
  name,
  value,
  labelText,
  handleChange
}: FormRowProps) {

  return (
    <div className='form-row'>
      <label htmlFor="name" className='form-label'>{labelText}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  )
}