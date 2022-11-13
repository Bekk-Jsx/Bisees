import { cash } from '../reducers/cashReducer'
import { settings } from '../reducers/settingsReducer'

import axios from 'axios';

export const filterCash = (id, from, until) => async dispatch => {

    try {

        if (!id) return;

        dispatch(settings.setLoadingC({}));

        const res = await axios.post(`https://us-central1-exepnoproject.cloudfunctions.net/bisees-dashboard?tab=CM`, {
            "atmId": id, from, until
        });


        dispatch(cash.getAllCash({
            metaData: res.data.CM.metadata,
            nextFulfill: res.data.CM.nextFulfillDates,
            replenishment: res.data.CM.replenishmentDates,
        }));

        dispatch(settings.setDefaultC({
            id, from, until
        }));

    } catch (err) {

        console.log(err);

        dispatch(settings.setError({ type: 'Get Cash Data', message: 'Failed To Get Cash Data!' }));
    }

}