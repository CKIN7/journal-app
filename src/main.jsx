import ReactDOM from 'react-dom/client';
import { JournalApp } from './JournalApp';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <JournalApp />
    </Provider>
);
