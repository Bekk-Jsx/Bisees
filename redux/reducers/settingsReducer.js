import { createSlice } from '@reduxjs/toolkit'


const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        atms: [],
        cities: [],
        branches: [],
        types: [],
        defaultAtmL: {},
        defaultAtmF: {},
        defaultAtmH: {},
        defaultAtmC: {},
        surviveAtm: null,
        from: null,
        until: null,
        fromCash: null,
        untilCash: null,
        loadingSettings: null,
        loadingL: false,
        loadingF: false,
        loadingH: false,
        loadingC: false,
        message: null,
        error: null,
    },
    reducers: {
        getAllFilterSettings: (state, action) => {
            state.atms = action.payload.atms;
            state.cities = action.payload.cities;
            state.branches = action.payload.branches;
            state.types = action.payload.types;
            state.surviveAtm = action.payload.surviveAtm;
            state.defaultAtmF = action.payload.defaultAtm;
            state.defaultAtmL = action.payload.defaultAtm;
            state.defaultAtmH = action.payload.defaultAtm;
            state.defaultAtmC = action.payload.defaultAtm;
            state.from = action.payload.from;
            state.until = action.payload.until;
            state.fromCash = action.payload.fromCash;
            state.untilCash = action.payload.untilCash;
            state.loadingL = false;
            state.loadingF = false;
            state.loadingH = false;
            state.loadingC = false;
            state.loadingSettings = false;
        },
        setSurviveAtm: (state, action) => {
            state.defaultAtmL = state.atms.filter(elm => elm.atmId === action.payload.id)[0];
            state.surviveAtm = action.payload.id;
        },
        setDefaultL: (state, action) => {
            state.defaultAtmL = state.atms.filter(elm => elm.atmId === action.payload.id)[0];
            state.surviveAtm = action.payload.id;
            state.loadingL = false;
        },
        setDefaultF: (state, action) => {
            state.defaultAtmF = state.atms.filter(elm => elm.atmId === action.payload.id)[0];
            state.surviveAtm = action.payload.id;
            state.loadingF = false;
        },
        setDefaultH: (state, action) => {
            state.defaultAtmH = state.atms.filter(elm => elm.atmId === action.payload.id)[0];
            state.from = action.payload.from;
            state.until = action.payload.until;
            state.surviveAtm = action.payload.id;
            state.loadingH = false;
        },
        setDefaultC: (state, action) => {
            state.defaultAtmC = state.atms.filter(elm => elm.atmId === action.payload.id)[0];
            state.fromCash = action.payload.from;
            state.untilCash = action.payload.until;
            state.surviveAtm = action.payload.id;
            state.loadingC = false;
        },
        setLoadingL: (state, action) => {
            state.loadingL = true;
        },
        setLoadingF: (state, action) => {
            state.loadingF = true;
        },
        setLoadingH: (state, action) => {
            state.loadingH = true;
        },
        setLoadingC: (state, action) => {
            state.loadingC = true;
        },
        setLoadingSettings: (state, action) => {
            state.loadingSettings = true;
            state.error = null;
            state.message = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.message = null;
            state.loadingF = false;
            state.loadingH = false;
            state.loadingC = false;
            state.loadingSettings = false;
            state.error = action.payload;
        },
    },

});


export const settings = settingsSlice.actions;

export default settingsSlice.reducer;