import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';
import { SearchBar } from './SearchBar';

export const JournalScreen = () => {
    const { active } = useSelector((state) => state.notes);

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar />

            <main>{active ? <NoteScreen /> : <SearchBar />}</main>
        </div>
    );
};
