import React, { Component, ChangeEvent } from 'react';
import { FetchError } from 'components/fetch-error';
import { SearchForm } from './components/search-form';
import { Articles } from './components/articles';
import { Settings } from './components/settings';
import { ORDER_BY, IWikiPageData } from './types';
import { LoadSpinner } from 'components/load-spinner';
import { searchArticles } from 'wikiapi';

import './App.css';

interface IAppState {
    searchInputValue: string;
    searchText: string;
    countToLoad: number;
    orderBy: ORDER_BY;
    isFetchingData: boolean;
    error: Error | null;
    articles: IWikiPageData[];
}

class App extends Component<{}, IAppState> {
    public state: IAppState = {
        searchInputValue: '',
        searchText: '',
        countToLoad: 10,
        orderBy: ORDER_BY.RELEVANCE,
        isFetchingData: false,
        error: null,
        articles: []
    };

    public componentDidMount() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSearchFormSubmit();
            }
        });
    }

    public render() {
        return (
            <div className="page">
                <h1 className='page__title'>WikiSearch</h1>
                <SearchForm
                    inputValue={this.state.searchInputValue}
                    onChange={this.handleInputChange}
                    onSubmit={this.handleSearchFormSubmit}
                />
                { this.state.error ? (
                    <FetchError text={this.state.error.message} />
                ) :
                this.state.isFetchingData ? (
                    <LoadSpinner />
                ) : (
                    <Articles articles={this.state.articles}/>
                )}
                <Settings
                    pageCount={this.state.countToLoad}
                    onArticlesCountChange={this.handleArticlesCountChange}
                    orderBy={this.state.orderBy}
                    onOrderByChange={this.handleOrderByChange}
                />
            </div>
        );
    }

    private fetchArticles = async () => {
        if (this.state.searchText === '') {
            await this.setState(() => ({ articles: [], error: null }));
            return;
        }

        await this.setState(() => ({ isFetchingData: true, error: null }));

        try {
            const articles = await searchArticles(this.state.searchText, {...this.state});
            await this.setState(() => ({ articles }));
        } catch (error) {
            await this.setState(() => ({ articles: [], error, isFetchingData: false }));
        }

        await this.setState(() => ({ isFetchingData: false }));
    }

    private handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchInputValue = event.target.value;
        this.setState(() => ({ searchInputValue }));
    }

    private handleSearchFormSubmit = async () => {
        await this.setState(() => ({ searchText: this.state.searchInputValue }));
        await this.fetchArticles();
    }

    private handleArticlesCountChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const countToLoad = Number(event.target.value);
        await this.setState(() => ({ countToLoad }));
    }

    private handleOrderByChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        switch (value) {
            case ORDER_BY.RELEVANCE:
                await this.setState(() => ({ orderBy: ORDER_BY.RELEVANCE }));
                break;

            case ORDER_BY.LAST_MODIFIED:
                await this.setState(() => ({ orderBy: ORDER_BY.LAST_MODIFIED }));
                break;
        }

        await this.fetchArticles();
    }
}

export default App;
