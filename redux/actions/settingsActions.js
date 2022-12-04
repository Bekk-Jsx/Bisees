import { settings } from '../reducers/settingsReducer'

const includesObj = (arr, id, key = 'atmId') => {
    return arr.filter((elm) => (elm[key] === id))[0];
};



export const setSurviveAtm = (loc, array) => async dispatch => {

    try {

        if (!loc) return;


        if (includesObj(array, loc.atmId)) {
            let selected = array.filter(elm => elm.atmId !== loc.atmId)
            dispatch(settings.setDefaultL({ id: selected[selected.length - 1].atmId }));
        } else {

            let selected = [loc, ...array];
            dispatch(settings.setDefaultL({ id: selected[selected.length - 1].atmId }));
        }


    } catch (err) {
        console.log(err)
    }

}