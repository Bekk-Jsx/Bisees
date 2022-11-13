import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import reducer from './reducers'

const initalState = {};
const middleware = [thunk];


const store = configureStore(
    { reducer },
    initalState, composeWithDevTools(applyMiddleware(...middleware))
);

// export default the store 
export default store;