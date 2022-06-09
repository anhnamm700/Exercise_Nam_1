import React, { Component }  from 'react';

interface InputValue {
    type: string,
    className: string,
    name: string
    id: string,
    value?: string,
    checked?: boolean,
    onChange(values: any) : void
}

const InputComponent = (props: InputValue) => {
    const { type, className, name, id, value, checked, onChange } = props
    
    
    return (
        <input
          type={type}
          className={className}
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
        />
    );
}

export default InputComponent;