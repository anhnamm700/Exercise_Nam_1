import React from 'react';
import style from './style.module.scss';

interface Props {
    className: string,
    type: string,
    style: object,
    disabled: boolean,
    children: React.ReactNode;
}

const ButtonComponent = (props : Props) => {
    const { className, type, style, disabled } = props;

    return (
        <button
            className={className}
            // data-type={type}
            type="submit"
            style={style}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
}

export default ButtonComponent;