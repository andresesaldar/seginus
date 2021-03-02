import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';

// Plugins
import 'bootstrap/dist/js/bootstrap.bundle';

// Styles
import './styles.scss';

// Components
import { App } from './app/App';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
