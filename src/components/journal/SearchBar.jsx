import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setActiveNote } from '../../slices/notesSlice';
import { useDispatch } from 'react-redux';

export const SearchBar = () => {
    const { notes } = useSelector((state) => state.notes);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState('');

    useEffect(() => {
        if (searchQuery) {
            const filteredNotesResult = notes.filter((note) => {
                return note.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });

            setFilteredNotes(filteredNotesResult);
        } else {
            setFilteredNotes([]);
        }
    }, [searchQuery, notes]);

    useEffect(() => {
        if (selectedNote === '') {
            setFilteredNotes([]);
        }
    }, [selectedNote]);

    const dispatch = useDispatch();

    const handleEntryClick = (note) => {
        dispatch(setActiveNote(note));
        setSearchQuery('');
    };

    return (
        <div className="search__bar">
            <input
                type="text"
                placeholder="Find notes..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value === '') {
                        setSelectedNote('');
                    }
                }}
            />

            <ul>
                {filteredNotes.map((note) => (
                    <li
                        key={note.id}
                        onClick={() => handleEntryClick(note)}>
                        {note.title}
                    </li>
                ))}
            </ul>

            {selectedNote ? (
                <div></div>
            ) : (
                <div onChange={(e) => e.target.value}></div>
            )}
        </div>
    );
};
