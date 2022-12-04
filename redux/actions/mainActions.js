import { locations } from '../reducers/locationsReducer'
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
            atms: atms, cities, branches, types, defaultAtm, from: config.DEFAULT_FROM, until: config.DEFAULT_UNTIL,
            fromCash: config.DEFAULT_FROM, untilCash: config.DEFAULT_UNTIL, surviveAtm: config.DEFAULT_ATM
        }));


        let casheData = {};


        casheData = JSON.parse(localStorage.getItem('BiseesData')) ? JSON.parse(localStorage.getItem('BiseesData')) : {};



        if (casheData?.data?.addedAt) {
            casheData.data.addedAt = new Date(casheData?.data?.addedAt);

            casheData.data.addedAt.setHours(casheData.data.addedAt.getHours() + 1);
        }


        if (!casheData?.data || (new Date() > casheData?.data?.addedAt)) {

            const res2 = await axios.post(`https://us-central1-exepnoproject.cloudfunctions.net/bisees-dashboard?tab=CM,HA,F,EC`, {
                "atmId": config.DEFAULT_ATM,
                "from": config.DEFAULT_FROM,
                "until": config.DEFAULT_UNTIL,
            });

            casheData.data = res2.data;


            localStorage.setItem('BiseesData', JSON.stringify({ data: { ...res2.data, addedAt: new Date() } }));


        }


        dispatch(locations.getAllLocations({
            locations: casheData?.data.EC,
        }));


        let top10 = [];

        casheData?.data.F.topAtmsByRMSE.forEach(elm => {

            let current = includesAtm(res.data, Number(elm.atmId));

            top10.push({ ...elm, name: current.atmName, code: current.code })
        })



        dispatch(forecasts.getAllForecasts({
            feature: casheData?.data.F.featureImportances,
            prediction: casheData?.data.F.prediction,
            performanceData: casheData?.data.F.testPreformance.data,
            performanceMetaData: casheData?.data.F.testPreformance.metadata,
            topAtms: top10
        }));


        let top5 = [];

        casheData?.data.HA.topAtmsByWithdrAmnt.forEach(elm => {

            let current = includesAtm(res.data, elm.code, 'code');

            top5.push({ ...elm, name: current?.atmName })
        })


        dispatch(historical.getAllHistorical({
            daily: casheData?.data.HA.dailyWithdrAmnt,
            metaData: casheData?.data.HA.metadata,
            topAtmsByWithdr: top5,
            total: casheData?.data.HA.totalDailyWithdrAmnt,
            yearly: casheData?.data.HA.yearlyWithdrAmnt
        }));


        dispatch(cash.getAllCash({
            metaData: casheData?.data.CM.metadata,
            nextFulfill: casheData?.data.CM.nextFulfillDates,
            replenishment: casheData?.data.CM.replenishmentDates,
        }));


    } catch (err) {

        console.log(err);

        dispatch(settings.setError({ type: 'Get Main Data', message: 'Failed To Load Data!' }));
    }


}