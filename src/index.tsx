import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

// Plugins
import 'bootstrap/dist/js/bootstrap.bundle';

// Styles
import './styles.scss';

// Components
import { App } from './app/App';
import { Provider } from 'react-redux';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
