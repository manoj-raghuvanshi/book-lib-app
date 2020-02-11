import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {addBook} from "../../actions/book";
import {ADD_BOOK_SUCCESS} from "../../types";

function AddBookComponent() {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const handleAddBook = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        addBookApi(value);
    };

    const addBookApi = (book: string) => {
        dispatch(addBook({name: book}));
        // @ts-ignore
        fetch('/api/books', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: book }),
        })
            .then((res: { json: () => any }) => res.json())
            .then((result: any) => {
                dispatch({type: ADD_BOOK_SUCCESS});
                setValue('');
                console.log(result);
                alert('book added')
            });
    };

    return (
        <form className="gp-add-book">
            <div>book name</div>
            <input
                className="gp-input"
                type="text"
                name="add book"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button className="gb-button" type="submit" onClick={handleAddBook}>
                Add
            </button>
        </form>
    );
}

export default AddBookComponent;
