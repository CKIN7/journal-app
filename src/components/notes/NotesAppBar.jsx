import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../slices/notesSlice';
import moment from 'moment';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector((state) => state.notes);

    const handleSave = () => {
        console.log(active.id);
        dispatch(startSaveNote(active));
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    };
    return (
        <div className="notes__appbar">
            <div>
                <span>{moment(active.date).format('dddd')}</span>
                <span>{moment(active.date).format('Do')}</span>
            </div>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div>
                <button
                    className="btn"
                    onClick={handlePictureClick}>
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};
