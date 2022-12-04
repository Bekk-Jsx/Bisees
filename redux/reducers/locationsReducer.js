import { createSlice } from '@reduxjs/toolkit'


const locationsSlice = createSlice({
    name: "locations",
    initialState: {
        locations: [],
        currentLocations: [],
        branches: [],
        currentBranches: [],
        remaining: 0,
        currentrRemaining: 0,
        estimated: 0,
        currentrEstimated: 0,
        mapPosition: { lat: 37.6373816, lng: 22.8054231 },
        mapZoom: 8,
        loadingLocations: null,
        message: null,
        error: null,
    },
    reducers: {
        getAllLocations: (state, action) => {

            let brchs = [], lcts = [], rmn = 0, est = 0;

            action.payload.locations.forEach(elm => {

                let random = Number((Math.random() * 10000).toFixed(0));
                random = random > 5000 ? random : (random + 2500);

                elm.estimatedAmntLive = elm.estimatedAmntLive || random;

                rmn += elm.remainingAmntLive;
                est += elm.estimatedAmntLive;

                if (!brchs.includes(elm.responsibleBranch)) {
                    brchs.push(elm.responsibleBranch)
                }

                lcts.push(elm)
            });

            state.estimated = state.estimated || est;
            state.remaining = rmn;
            state.locations = lcts;
            state.branches = brchs;
            state.loadingLocations = false;
        },
        selectLocation: (state, action) => {
            state.currentLocations = [action.payload, ...state.currentLocations];
            state.currentrRemaining += action.payload.remainingAmntLive;
            state.currentrEstimated += action.payload.estimatedAmntLive;
            state.currentBranches = state.currentBranches.includes(action.payload.responsibleBranch) ? state.currentBranches : [action.payload.responsibleBranch, ...state.currentBranches];
        },
        unselectLocation: (state, action) => {
            let current = state.currentLocations.filter(elm => elm.atmId !== action.payload.atmId)
            state.currentLocations = current;

            let brchs = []

            state.currentLocations.forEach(elm => {
                if (!brchs.includes(elm.responsibleBranch)) {
                    brchs.push(elm.responsibleBranch)
                }
            });

            state.currentBranches = brchs;
            state.currentrRemaining -= action.payload.remainingAmntLive;
            state.currentrEstimated -= action.payload.estimatedAmntLive;

        },
        filterLocation: (state, action) => {

            let loc = state.locations.filter(elm => elm.atmId === action.payload.id)[0];

            let random = Number((Math.random() * 10000).toFixed(0));
            random = random > 5000 ? random : (random + 2500)

            state.currentLocations = [loc];
            state.currentBranches = [loc.responsibleBranch];
            state.currentrRemaining = loc.remainingAmntLive;
            state.currentrEstimated = loc.estimatedAmntLive || random;
            state.mapPosition = { lat: loc.location_lat, lng: loc.location_lng }
            state.mapZoom = 15;

        },
        clearFilter: (state) => {
            state.currentLocations = [];
            state.currentBranches = [];
            state.currentrRemaining = 0;
            state.currentrEstimated = 0;
            state.mapPosition = { lat: 37.6373816, lng: 22.8054231 };
            state.mapZoom = Number((state.mapZoom).toFixed(0)) === 8 ? state.mapZoom + 0.001 : 8;
        },
        setLoadingCash: (state) => {
            state.loadingLocations = true;
            state.error = null;
            state.message = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.loadingLocations = false;
            state.message = null;
            state.error = action.payload;
        },
    }
});


export const locations = locationsSlice.actions;

export default locationsSlice.reducer;