import { IWikiPageData, IWikiRequestParams, IWikiResponse } from '../types';

export async function searchArticles(
    searchText: string,
    params: IWikiRequestParams
): Promise<IWikiPageData[]> {
    const url = makeUrl(searchText, params);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Не удалось загрузить статьи');
    }

    const parsedResponse: IWikiResponse = await response.json();

    handleApiResponseError(parsedResponse);

    return extractPages(parsedResponse);
}

function makeUrl(searchText: string, params: IWikiRequestParams) {
    const url = new URL('https://ru.wikipedia.org/w/api.php');
    const countToLoad = params.countToLoad.toString();

    const query = new URLSearchParams({
        action: 'query',
        format: 'json',
        origin: '*',
        generator: 'search',
        gsrsearch: searchText,
        gsrsort: params.orderBy,
        gsrlimit: countToLoad,
        prop: 'extracts|info',
        exsentences: '4',
        exintro: '1',
        explaintext: '1',
        inprop: 'url'
    });

    url.search = query.toString();
    return url.href;
}

function handleApiResponseError(parsedResponse: IWikiResponse) {
    if (parsedResponse.error) {
        const errorInfo = parsedResponse.error.info;
        console.error(errorInfo);
        throw new Error('Не удалось загрузить статьи');
    }
}

function extractPages(parsedResponse: IWikiResponse) {
    if (!parsedResponse.query) {
        throw new Error('По вашему запросу ничего не найдено');
    }

    const pages: IWikiPageData[] = Object.values(parsedResponse.query.pages);

    return pages;
}
