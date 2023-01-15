import React from 'react';

export type TDropdownOption = {name: string, value: string | number};

interface DropdownProps {
    title ?: string;
    options : TDropdownOption[];
    id : string;
}

// {title && <label htmlFor={`${title?.toLowerCase()}-dropdown`} className="form-label">{title}</label>}
const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(({title, options, id} : DropdownProps, ref) => (
    <select defaultValue={options[0].value} ref={ref} id={id} className="form-select">
        {options.map(option => <option value={option.value} key={option.value}>{option.name}</option>)}
    </select>
));

export default Dropdown;
