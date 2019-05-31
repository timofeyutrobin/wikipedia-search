import React from 'react';
import { IWikiPageData } from 'types';

import './index.css';

interface IArticleProps {
    article: IWikiPageData;
}

export function Article(props: IArticleProps) {
    return (
        <article key={props.article.pageid} className='article articles__article'>
            <h2 className='article__header'>
                <a
                    className='link'
                    href={props.article.canonicalurl}
                    target='__blank'
                >
                    {props.article.title}
                </a>
            </h2>
            <p className='article__description'>
                {props.article.extract}
            </p>
            <section className='article__info'>
                Длина: {props.article.length} | Дата последнего обновления: {props.article.touched}
            </section>
        </article>
    );
}
