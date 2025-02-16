import { createStore, applyMiddleware, legacy_createStore, configureStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer.js';

/*export const store = configureStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);*/