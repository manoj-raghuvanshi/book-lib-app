import {ADD_BOOK_START, FETCH_BOOKS_START, SEARCH_START, UPDATE_BOOK_START} from "../types";
import {IAction} from "../interfaces";

interface SearchBook {
    type: string;
    term: string;
}

export const getBooks = (): IAction => ({
    type: FETCH_BOOKS_START,
});

export const searchBook = (term: string): SearchBook => ({
    type: SEARCH_START,
    term
});

export const addBook = (payload: {name: string}) => ({
    type: ADD_BOOK_START,
    payload
});

export const updateBook = (payload: {name: string; id: string}) => ({
    type: UPDATE_BOOK_START,
    payload
});


