import { createSlice } from '@reduxjs/toolkit'


const historicalSlice = createSlice({
    name: "historical",
    initialState: {
        daily: [],
        currentDaily: [],
        metaData: {},
        currentMetaData: {},
        topAtmsByWithdr: [],
        currentTopAtmsByWithdr: [],
        total: [],
        currentTotal: [],
        yearly: [],
        currentYearly: [],
        loadingHistorical: null,
        message: null,
        error: null,
    },
    reducers: {
        getAllHistorical: (state, action) => {
            state.daily = action.payload.daily;
            state.currentDaily = action.payload.daily;
            state.metaData = action.payload.metaData;
            state.currentMetaData = action.payload.metaData;
            state.topAtmsByWithdr = action.payload.topAtmsByWithdr;
            state.currentTopAtmsByWithdr = action.payload.topAtmsByWithdr;
            state.total = action.payload.total;
            state.currentTotal = action.payload.total;
            state.yearly = action.payload.yearly;
            state.currentYearly = action.payload.yearly;
            state.loadingHistorical = false;
        },
        setLoadingHistorical: (state) => {
            state.loadingHistorical = true;
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


export const historical = historicalSlice.actions;

export default historicalSlice.reducer;