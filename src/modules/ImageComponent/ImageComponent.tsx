import React from 'react';
import style from './style.module.scss';

interface Props {
    src: string,
    alt: string,
    className: any
}

const ImageComponent = (props: Props) => {
    const { src, alt, className } = props;

    const start = style.image.indexOf('_');
    const end = style.image.indexOf('__');
    
    const result = style.image.substring(start + 1, end);

    return (
        <img 
            src={src} 
            alt={alt} 
            className={( result === className ? style[className] : '' )}
        />
    );
}

export default ImageComponent;