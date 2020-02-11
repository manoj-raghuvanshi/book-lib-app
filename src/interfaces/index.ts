export interface ISearchResult {
    name: string
    id: string
}

export interface ISearchResults extends Array<ISearchResult> {}

export interface ISearchResultProps {
    data: ISearchResults;
    onUpdate(obj: ISearchResult): void;
    isUpdated: boolean;
}
export interface IAction {
    payload?: any;
    type: string
    data?: any
    term?: string
    id?: string
}
