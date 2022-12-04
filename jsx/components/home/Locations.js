import React, { Fragment, useEffect, useMemo, useState } from 'react';

import {
    GoogleMap,
    useLoadScript,
    MarkerF,
    markerLoadHandler,
} from '@react-google-maps/api';

import Cards from './Cards';

const includesObj = (arr, id, key = 'atmId') => {
    return arr.filter((elm) => elm[key] === id)[0];
};

const Locations = ({
    mapZoom,
    mapPosition,
    locations,
    selected,
    branches,
    currentBranches,
    remaining,
    currentrRemaining,
    estimated,
    currentrEstimated,
    selectLocation,
    setSurviveAtm,
}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA9yA2eT9iBRFHriCNZhDICO5YR2hzciLE',
    });

    const center = useMemo(() => mapPosition, [mapPosition, selected]);

    if (!isLoaded) return;
    <div className='w-full flex justify-center mt-8'>
        <div className='w-11/12 flex flex-col md:flex-row justify-between gap-9'>
            <div>Loading...</div>
        </div>
    </div>;

    return (
        <Fragment>
            {/* Meta Data  */}

            <Cards
                locations={locations}
                selected={selected}
                branches={branches}
                currentBranches={currentBranches}
                remaining={remaining}
                currentrRemaining={currentrRemaining}
                estimated={estimated}
                currentrEstimated={currentrEstimated}
                setSurviveAtm={setSurviveAtm}
            />

            {/* Map  */}

            <div className='w-full flex justify-center mt-8' id='section-locations'>
                <div className='w-11/12 card-border'>
                    <div className='mb-[50px]'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'>
                            {' '}
                            All ATM locations{' '}
                        </h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'>
                            {' '}
                            These Location Views are based on all ATMs.{' '}
                        </p>
                    </div>

                    <div className='w-full h-[90vh]'>
                        <GoogleMap
                            zoom={mapZoom}
                            center={center}
                            mapContainerClassName='w-full h-full'
                        >
                            {locations.map((elm) => (
                                <Fragment key={elm.atmId}>
                                    <MarkerF
                                        position={{ lat: elm.location_lat, lng: elm.location_lng }}
                                        className='marker-maps'
                                        icon={{
                                            url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
                                        }}
                                        onClick={() => {
                                            selectLocation(elm, selected);
                                            setSurviveAtm(elm, selected);
                                        }}
                                        visible={
                                            selected.length === 0
                                                ? false
                                                : includesObj(selected, elm.atmId)
                                                    ? false
                                                    : true
                                        }
                                    />

                                    <MarkerF
                                        position={{ lat: elm.location_lat, lng: elm.location_lng }}
                                        className='marker-maps'
                                        icon={{
                                            url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
                                        }}
                                        onClick={() => {
                                            selectLocation(elm, selected);
                                            setSurviveAtm(elm, selected);
                                        }}
                                        visible={
                                            selected.length === 0
                                                ? true
                                                : includesObj(selected, elm.atmId)
                                                    ? true
                                                    : false
                                        }
                                    />
                                </Fragment>
                            ))}
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Locations;
