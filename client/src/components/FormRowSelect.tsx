import { ChangeEvent } from 'react';

interface FormRowSelectProps {
  name: string;
  value: string;
  labelText?: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  optionsList: string[];
}

export default function FormRowSelect({
  name,
  value,
  handleChange,
  labelText,
  optionsList
}: FormRowSelectProps) {

  return (
    <div className="form-row">
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {optionsList.map((listOption, index) => (
          <option key={index} value={listOption}>{listOption}</option>
        ))}
      </select>
    </div>
  )
}