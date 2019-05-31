import React from 'react';
import { Article } from '../article';
import { IWikiPageData } from '../../types';

import './index.css';

interface IArticlesProps {
    articles: IWikiPageData[];
}

export function Articles(props: IArticlesProps) {
    return (
        <main className='articles page__articles'>
            {props.articles.map(article =>
                <Article key={article.pageid} article={article} />
            )}
        </main>
    );
}
