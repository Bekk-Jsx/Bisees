import { forecasts } from '../reducers/forecastsReducer'
import { settings } from '../reducers/settingsReducer'

import axios from 'axios';


const includesAtm = (arr, id, key = 'atmId') => {
    return arr.filter((elm) => (elm[key] === id))[0];
};




export const filterForecasts = (id, atms) => async dispatch => {

    try {

        if (!id) return;

        dispatch(settings.setLoadingF({}));

        const res = await axios.post(`https://us-central1-exepnoproject.cloudfunctions.net/bisees-dashboard?tab=F`, {
            "atmId": id
        });


        let top10 = [];

        res.data.F.topAtmsByRMSE.forEach(elm => {

            let current = includesAtm(atms, Number(elm.atmId));

            top10.push({ ...elm, name: current.atmName, code: current.code })
        })


        dispatch(forecasts.getAllForecasts({
            feature: res.data.F.featureImportances,
            prediction: res.data.F.prediction,
            performanceData: res.data.F.testPreformance.data,
            performanceMetaData: res.data.F.testPreformance.metadata,
            topAtms: top10
        }));

        dispatch(settings.setDefaultF({
            id
        }));


    } catch (err) {

        console.log(err);

        dispatch(settings.setError({ type: 'Get Forcasts Data', message: 'Failed To Get Forecasts Data!' }));

    }

}