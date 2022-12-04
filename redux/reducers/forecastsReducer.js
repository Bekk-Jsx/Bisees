import { createSlice } from '@reduxjs/toolkit'


const forecastsSlice = createSlice({
    name: "forecasts",
    initialState: {
        feature: [],
        currentFeature: [],
        currentFeature: [],
        prediction: [],
        currentPrediction: [],
        performanceData: [],
        currentPerformanceData: [],
        performanceMetaData: {},
        currentPerformanceMetaData: {},
        topAtms: [],
        currentTopAtms: [],
        loadingForecasts: null,
        message: null,
        error: null,
    },
    reducers: {
        getAllForecasts: (state, action) => {
            state.feature = action.payload.feature;
            state.currentFeature = action.payload.feature;
            state.prediction = action.payload.prediction;
            state.currentPrediction = action.payload.prediction;
            state.performanceData = action.payload.performanceData;
            state.currentPerformanceData = action.payload.performanceData;
            state.performanceMetaData = action.payload.performanceMetaData;
            state.currentPerformanceMetaData = action.payload.performanceMetaData;
            state.topAtms = action.payload.topAtms;
            state.currentTopAtms = action.payload.topAtms;
            state.loadingForecasts = false;
        },
        setLoadingForecasts: (state) => {
            state.loadingForecasts = true;
            state.error = null;
            state.message = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.message = null;
            state.error = action.payload;
        },
    },

});


export const forecasts = forecastsSlice.actions;

export default forecastsSlice.reducer;