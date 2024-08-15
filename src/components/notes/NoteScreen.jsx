import { useSelector, useDispatch } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { useEffect, useRef } from 'react';
import { setActiveNote, startDeleting } from '../../slices/notesSlice';
import { SearchBar } from '../journal/SearchBar';

export const NoteScreen = () => {
    const { active } = useSelector((state) => state.notes);
    const [formValues, handleInputChange, reset] = useForm(active);
    const { body, title } = formValues;

    const activeId = useRef(active);
    const dispatch = useDispatch();

    useEffect(() => {
        if (active.id !== activeId.current) {
            reset(active);
            activeId.current = active.id;
        }
    }, [active, reset]);

    useEffect(() => {
        dispatch(setActiveNote({ ...formValues }));
    }, [dispatch, formValues]);

    const handleDelete = () => {
        dispatch(startDeleting(active.id));
    };

    return (
        <div className="notes__main-content">
            <SearchBar />
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}></textarea>

                {active.url && (
                    <div className="notes__image">
                        <img
                            src={active.url}
                            alt="imagen"
                        />
                    </div>
                )}
            </div>

            <button
                className="btn btn-delete"
                onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};
