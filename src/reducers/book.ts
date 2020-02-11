import {
    ADD_BOOK_START,
    ADD_BOOK_SUCCESS,
    FETCH_BOOKS_START,
    FETCH_BOOKS_SUCCESS,
    SEARCH_START,
    UPDATE_BOOK_START, UPDATE_BOOK_SUCCESS
} from '../types';
import { IAction, ISearchResult } from '../interfaces';

const init = { term: '', searchResult: [], filteredResult: [] }
const reducer = (
    state: any = init,
    action: IAction
) => {
    switch (action.type) {
        case SEARCH_START:
            return {
                ...state,
                isSearching: true,
                term: action.term,
                filteredResult: state.searchResult.filter(
                    (el: ISearchResult) =>
                        el.name && el.name.indexOf(action.term as string) > -1
                ),
            };
        case FETCH_BOOKS_START:
            return { ...state, searchResult: [] };
        case FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                searchResult: action.data,
                filteredResult: action.data,
            };
        // TODO add required things after calling this action , I added for reference purpose :)
        case ADD_BOOK_START:
            return {...state};

        case ADD_BOOK_SUCCESS:
            return {...state};

        case UPDATE_BOOK_START:
            console.log(state)
            return {...state, isUpdating: true};

        case UPDATE_BOOK_SUCCESS:
            const updatedData = state.searchResult.map(
                (el: ISearchResult) =>
                {
                    if (el.id === action.payload.id) {
                        el.name = action.payload.name;
                    }
                    return el;
                }
            );
            return {...state, isUpdating: false,
                searchResult: updatedData,
                filteredResult: updatedData};
        default:
            return state;
    }
};

export default reducer;
