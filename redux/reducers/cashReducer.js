import { createSlice } from '@reduxjs/toolkit'


const cashSlice = createSlice({
    name: "cash",
    initialState: {
        replenishment: [],
        currentReplenishment: [],
        metaData: {},
        currentMetaData: {},
        nextFulfill: [],
        currentNextFulfill: [],
        loadingCash: null,
        message: null,
        error: null,
    },
    reducers: {
        getAllCash: (state, action) => {
            state.replenishment = action.payload.replenishment;
            state.currentReplenishment = action.payload.replenishment;
            state.metaData = action.payload.metaData;
            state.currentMetaData = action.payload.metaData;
            state.nextFulfill = action.payload.nextFulfill;
            state.currentNextFulfill = action.payload.nextFulfill;
            state.loadingCash = false;
        },
        setLoadingCash: (state) => {
            state.loadingCash = true;
            state.error = null;
            state.message = null;
        },
        setMessage: (state) => {
            state.message = action.payload;
            state.error = null;
        },
        setError: (state) => {
            state.message = null;
            state.error = action.payload;
        },
    },

});


export const cash = cashSlice.actions;

export default cashSlice.reducer;