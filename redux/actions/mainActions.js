import { forecasts } from '../reducers/forecastsReducer'
import { historical } from '../reducers/historicalReducer'
import { cash } from '../reducers/cashReducer'
import { settings } from '../reducers/settingsReducer'

import axios from 'axios';

// import { forecastsData, historicalData, cashData } from './actionsData'

import config from '../../config';


const includesCity = (arr, id, key = 'value') => {
    return arr.filter((elm) => (elm[key] === id))[0];
};

const includesBranch = (arr, city, branch) => {
    return arr.find((elm) => {
        return elm.city === city && elm.value === branch;
    });
};

const includesType = (arr, city, branch, type) => {
    return arr.find((elm) => {
        return elm.city === city && elm.branch === branch && elm.value === type;
    });
};

const includesAtm = (arr, id, key = 'atmId') => {
    return arr.filter((elm) => (elm[key] === id))[0];
};



export const getAllData = () => async dispatch => {


    try {

        dispatch(forecasts.setLoadingForecasts());
        dispatch(historical.setLoadingHistorical());
        dispatch(cash.setLoadingCash());
        dispatch(settings.setLoadingSettings());


        const res = await axios.get(`https://us-central1-exepnoproject.cloudfunctions.net/bisees-dashboard`);


        let cities = [{ value: '', label: 'None' }];
        let branches = [];
        let types = [];
        let atms = [];
        let defaultAtm = {};


        res.data.forEach(elm => {

            if (!includesCity(cities, elm.municipality)) {
                cities.push({ value: elm.municipality, label: elm.municipality });
            }

            if (!includesBranch(branches, elm.municipality, elm.responsibleBranch)) {
                branches.push({ city: elm.municipality, value: elm.responsibleBranch, label: elm.responsibleBranch });
            }

            if (!includesType(types, elm.municipality, elm.responsibleBranch, elm.LocationType)) {
                types.push({ city: elm.municipality, branch: elm.responsibleBranch, value: elm.LocationType, label: elm.LocationType });
            }

            if (elm.atmId === config.DEFAULT_ATM) {
                defaultAtm = elm;
            }

            atms.push({ ...elm, value: elm.atmId, label: elm.atmName })

        });


        dispatch(settings.getAllFilterSettings({
            atms: atms, cities, branches, types, defaultAtm, from: config.DEFAULT_FROM, until: config.DEFAULT_UNTIL, fromCash: config.DEFAULT_FROM, untilCash: config.DEFAULT_UNTIL,
        }));


        const res2 = await axios.post(`https://us-central1-exepnoproject.cloudfunctions.net/bisees-dashboard?tab=CM,HA,F`, {
            "atmId": config.DEFAULT_ATM,
            "from": config.DEFAULT_FROM,
            "until": config.DEFAULT_UNTIL,
        });


        let top10 = [];

        res2.data.F.topAtmsByRMSE.forEach(elm => {

            let current = includesAtm(res.data, Number(elm.atmId));

            top10.push({ ...elm, name: current.atmName, code: current.code })
        })



        dispatch(forecasts.getAllForecasts({
            feature: res2.data.F.featureImportances,
            prediction: res2.data.F.prediction,
            performanceData: res2.data.F.testPreformance.data,
            performanceMetaData: res2.data.F.testPreformance.metadata,
            topAtms: top10
        }));


        let top5 = [];

        res2.data.HA.topAtmsByWithdrAmnt.forEach(elm => {

            let current = includesAtm(res.data, elm.code, 'code');

            top5.push({ ...elm, name: current?.atmName })
        })


        dispatch(historical.getAllHistorical({
            daily: res2.data.HA.dailyWithdrAmnt,
            metaData: res2.data.HA.metadata,
            topAtmsByWithdr: top5,
            total: res2.data.HA.totalDailyWithdrAmnt,
            yearly: res2.data.HA.yearlyWithdrAmnt
        }));


        dispatch(cash.getAllCash({
            metaData: res2.data.CM.metadata,
            nextFulfill: res2.data.CM.nextFulfillDates,
            replenishment: res2.data.CM.replenishmentDates,
        }));


        // dispatch(forecasts.getAllForecasts({
        //     feature: forecastsData.featureImportances,
        //     prediction: forecastsData.prediction,
        //     performanceData: forecastsData.testPreformance.data,
        //     performanceMetaData: forecastsData.testPreformance.metadata,
        //     topAtms: forecastsData.topAtmsByRMSE
        // }));



        // dispatch(historical.getAllHistorical({
        //     daily: historicalData.dailyWithdrAmnt,
        //     metaData: historicalData.metadata,
        //     topAtmsByWithdr: historicalData.topAtmsByWithdrAmnt,
        //     total: historicalData.totalDailyWithdrAmnt,
        //     yearly: historicalData.yearlyWithdrAmnt
        // }));


        // dispatch(cash.getAllCash({
        //     metaData: cashData.metadata,
        //     nextFulfill: cashData.nextFulfillDates,
        //     replenishment: cashData.replenishmentDates,
        // }));


    } catch (err) {

        console.log(err);

        dispatch(settings.setError({ type: 'Get Main Data', message: 'Failed To Load Data!' }));
    }


}