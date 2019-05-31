import React, { ChangeEvent } from 'react';

import './index.css';

interface ISearchFormProps {
    inputValue: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

export function SearchForm(props: ISearchFormProps) {
    return (
        <form className='search page__search'>
            <input
                className='search__input'
                onChange={props.onChange}
                value={props.inputValue}
                type='search'
                placeholder='Поиск...'
            />
            <button
                className='search__button'
                type='button'
                onClick={props.onSubmit}
            >
                Найти
            </button>
        </form>
    );
}
