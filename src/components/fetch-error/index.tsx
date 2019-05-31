import React from "react";

import './index.css';
import iconDark from 'images/sad-dark-theme.png';

interface IFetchErrorProps {
    text: string;
}

export function FetchError(props: IFetchErrorProps) {
    return (
        <div className='error page__error'>
            <div className='error__text'>{props.text}</div>
            <img
                className='error__image'
                src={iconDark}
                alt='sad icon'
            />
        </div>
    );
}
