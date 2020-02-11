import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { ISearchResult, ISearchResultProps } from '../../interfaces';
import './style.css';

export default ({ data, onUpdate, isUpdated }: ISearchResultProps) => {
    const dispatch = useDispatch();
    const [editingItem, setEditingItem] = useState({
        id: -1,
        text: '',
        isUpdating: false
    });

    useEffect(() => {
        if (isUpdated) {
            setEditingItem({
                id: -1,
                text: '',
                isUpdating: false
            })
        }
    }, [isUpdated]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setEditingItem(oldVal => ({ ...oldVal, text: value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(e.keyCode);
    };

    const handleUpdateBook = (bookId: string) => {
        onUpdate({name: editingItem.text, id: bookId});

    }

    return (
        <div>
            {data.length === 0 && <div>No Books found</div>}
            {data.map((el: ISearchResult, id) => {
                return (
                    <div key={id} className="gp-result">
                        <div>
                            {editingItem.id === id ? (
                                <>
                                    {' '}
                                    <input
                                        className="gp-input"
                                        type="text"
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        value={editingItem.text}
                                    />{' '}
                                    <button
                                        onClick={(e) => handleUpdateBook(el.id)}
                                    >
                                        Save
                                    </button>{' '}
                                </>
                            ) : (
                                <>
                                    {' '}
                                    {el.name}{' '}
                                    <button
                                        onClick={() =>
                                            setEditingItem({
                                                id: id,
                                                text: el.name,
                                                isUpdating: true,
                                            })
                                        }
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
