import { combineReducers } from 'redux';

import forecastsReducer from './forecastsReducer';
import historicalReducer from './historicalReducer';
import cashReducer from './cashReducer';
import settingsReducer from './settingsReducer';

const reducer = combineReducers({
    forecasts: forecastsReducer,
    historical: historicalReducer,
    cash: cashReducer,
    settings: settingsReducer,
});

export default reducer;