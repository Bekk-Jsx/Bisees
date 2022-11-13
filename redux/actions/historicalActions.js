import { historical } from '../reducers/historicalReducer'
import { settings } from '../reducers/settingsReducer'

import axios from 'axios';


const includesAtm = (arr, id, key = 'atmId') => {
    return arr.filter((elm) => (elm[key] === id))[0];
};



export const filterHistorical = (id, from, until, atms) => async dispatch => {

    try {

        if (!id) return;

        dispatch(settings.setLoadingH({}));

        const res = await axios.post(`https://us-central1-exepnoproject.cloudfunctions.net/bisees-dashboard?tab=HA`, {
            atmId: id, from, until
        });


        let top5 = [];

        res.data.HA.topAtmsByWithdrAmnt.forEach(elm => {

            let current = includesAtm(atms, elm.code, 'code');

            top5.push({ ...elm, name: current?.atmName })
        })


        dispatch(historical.getAllHistorical({
            daily: res.data.HA.dailyWithdrAmnt,
            metaData: res.data.HA.metadata,
            topAtmsByWithdr: top5,
            total: res.data.HA.totalDailyWithdrAmnt,
            yearly: res.data.HA.yearlyWithdrAmnt
        }));

        dispatch(settings.setDefaultH({
            id, from, until
        }));


    } catch (err) {

        console.log(err);

        dispatch(settings.setError({ type: 'Get Historical Data', message: 'Failed To Get Historical Data!' }));

    }

}