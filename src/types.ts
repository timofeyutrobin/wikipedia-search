// Names from original wikipedia api

export interface IWikiPageData {
    pageid: number;
    title: string;
    extract: string;
    touched: string;
    length: string;
    canonicalurl: string;
}

export interface IWikiResponse {
    error?: {
        info: string
    };
    query?: {
        pages: IWikiPageData[]
    };
}

export interface IWikiRequestParams {
    countToLoad: number;
    orderBy: ORDER_BY;
}

export enum ORDER_BY {
    RELEVANCE = 'relevance',
    LAST_MODIFIED = 'last_edit_desc'
}
