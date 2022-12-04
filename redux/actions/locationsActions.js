import { locations } from '../reducers/locationsReducer'
import { settings } from '../reducers/settingsReducer'

const includesObj = (arr, id, key = 'atmId') => {
    return arr.filter((elm) => (elm[key] === id))[0];
};


export const selectLocation = (loc, selected) => async dispatch => {


    if (includesObj(selected, loc.atmId)) {
        dispatch(locations.unselectLocation(loc));
    } else {
        dispatch(locations.selectLocation(loc));
    }

}


export const filterLocation = (id) => async dispatch => {

    if (!id) return;

    dispatch(settings.setLoadingL());

    dispatch(locations.filterLocation({
        id
    }));

    dispatch(settings.setDefaultL({
        id
    }));

}


export const clearFilter = () => async dispatch => {

    dispatch(locations.clearFilter());

}