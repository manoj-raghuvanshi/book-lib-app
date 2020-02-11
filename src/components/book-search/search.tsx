import React, { useCallback, useEffect, useReducer, useState } from 'react'

import {getBooks, searchBook, updateBook} from '../../actions/book'
import {FETCH_BOOKS_FAILED, FETCH_BOOKS_SUCCESS, UPDATE_BOOK_SUCCESS} from '../../types'
import SearchResult from '../search-result'
import bookReducer from '../../reducers/book'
import './style.css'
import useDebounce from './useDebounce'
import { EDIT_BOOK_START } from '../../types/search'

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [items, dispatchItems] = useReducer(bookReducer, {
        term: '',
        searchResult: [],
        filteredResult: [],
    })
    const debouncedSearch = useDebounce(searchTerm, 300)
    useEffect(() => {
        fetchBooks()
    }, []);

    useEffect(() => {
        setIsSearching(false);
    }, [items]);

    const fetchBooks = useCallback(() => {
        dispatchItems(getBooks());
        fetch('/api/books')
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log(result);
                dispatchItems({ type: FETCH_BOOKS_SUCCESS, data: result.books })
            })
            .catch(err => {
                dispatchItems({ type: FETCH_BOOKS_FAILED })
            })
    }, []);

    useEffect(() => {
        dispatchItems(searchBook(debouncedSearch))
    }, [debouncedSearch]);

    const handleEditClick = (id: string): void => {
        dispatchItems({
            type: EDIT_BOOK_START,
            id,
        });
        // @ts-ignore
        fetch({ method: 'put', url: `/api/book/${id}` })
            .then((res: { json: () => any }) => res.json())
            .then((result: Response) => {console.log(result)})
    };

    const updateBookApi = (book: {name: string; id: string}) => {
        dispatchItems(updateBook(book));
        // @ts-ignore
        fetch(`/api/books/${book.id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: book.name }),
        })
            .then((res: { json: () => any }) => res.json())
            .then((result: any) => {
                console.log(result);
                dispatchItems({type: UPDATE_BOOK_SUCCESS, payload: book});
                alert('book updated');
            });
    };

    return (
        <div>
            <input
                className="gp-input"
                type="text"
                value={searchTerm}
                onChange={e => {setIsSearching(true);setSearchTerm(e.target.value)}}
                placeholder="search book"
            />
            {isSearching && <div>Searching ...</div>}
            <SearchResult data={items.filteredResult} onUpdate={ updateBookApi} isUpdated={!items.isUpdating} />
        </div>
    )
}

export default SearchComponent
