import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as LinkScroll } from 'react-scroll'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faFileWaveform, faWallet, faXmark, faAnglesLeft, faMapPin } from '@fortawesome/free-solid-svg-icons'

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import FilterList from './FilterList'
import ForecastsHead from './ForecastsHead'
import HistoricalHead from './HistoricalHead'
import CashHead from './CashHead'
import LocationsHead from './LocationsHead'

import DisplayError from './DisplayError'

const sections0 = [{ title: 'ATM Locations', id: 'section-locations' }];
const sections1 = [{ title: 'Forecasting', id: 'section-prediction' }, { title: 'Performance', id: 'section-performance' }, { title: 'Features', id: 'section-features' }];
const sections2 = [{ title: 'Daily Withdrawals', id: 'section-daily' }, { title: 'Total Withdrawals', id: 'section-total' }, { title: 'Yearly Withdrawals', id: 'section-yearly' }];
const sections3 = [{ title: 'Replenishment', id: 'section-replenishment' }];





const Header = ({ atms, cities, branches, from, until, fromCash, untilCash, types, defaultAtmL, defaultAtmF, defaultAtmH, defaultAtmC, filterLocation, filterForecasts, filterHistorical, filterCash, clearFilter, loadingL, loadingF, loadingH, loadingC, error }) => {

    const router = useRouter();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(false);

    const [city, setCity] = useState(defaultAtmF.municipality);
    const [branch, setBranch] = useState(defaultAtmF.responsibleBranch);
    const [type, setType] = useState(defaultAtmF.LocationType);
    const [atm, setAtm] = useState(defaultAtmF.atmId);

    const [cityL, setCityL] = useState(defaultAtmL.municipality);
    const [branchL, setBranchL] = useState(defaultAtmL.responsibleBranch);
    const [typeL, setTypeL] = useState(defaultAtmL.LocationType);
    const [atmL, setAtmL] = useState(defaultAtmL.atmId);

    const [cityHis, setCityHis] = useState(defaultAtmH.municipality);
    const [branchHis, setBranchHis] = useState(defaultAtmH.responsibleBranch);
    const [typeHis, setTypeHis] = useState(defaultAtmH.LocationType);
    const [atmHis, setAtmHis] = useState(defaultAtmH.atmId);

    const [cityCash, setCityCash] = useState(defaultAtmC.municipality);
    const [branchCash, setBranchCash] = useState(defaultAtmC.responsibleBranch);
    const [typeCash, setTypeCash] = useState(defaultAtmC.LocationType);
    const [atmCash, setAtmCash] = useState(defaultAtmC.atmId);

    const sections = router.pathname === '/' ? sections0 : router.pathname === '/forecasting' ? sections1 : router.pathname === '/historical' ? sections2 : router.pathname === '/cash' ? sections3 : [];

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {

        setCity(defaultAtmF.municipality);
        setBranch(defaultAtmF.responsibleBranch);
        setType(defaultAtmF.LocationType);
        setAtm(defaultAtmF.atmId);

        setCityHis(defaultAtmH.municipality);
        setBranchHis(defaultAtmH.responsibleBranch);
        setTypeHis(defaultAtmH.LocationType);
        setAtmHis(defaultAtmH.atmId);

        setCityCash(defaultAtmC.municipality);
        setBranchCash(defaultAtmC.responsibleBranch);
        setTypeCash(defaultAtmC.LocationType);
        setAtmCash(defaultAtmC.atmId);

        setCityL(defaultAtmL.municipality);
        setBranchL(defaultAtmL.responsibleBranch);
        setTypeL(defaultAtmL.LocationType);
        setAtmL(defaultAtmL.atmId);

    }, [isOpen, defaultAtmL, defaultAtmF, defaultAtmH, defaultAtmC]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })
    }, [])


    const list = () => (
        <Box
            sx={{ width: 290 }}
            role="presentation"
        // onKeyDown={() => setIsOpen(!isOpen)}
        >

            {/* Header  */}

            <div className='drawer-header filter-header w-full flex justify-center'>
                <div className='w-11/12 flex justify-between'>
                    <p className='filter-logo'> Filter
                        {router.pathname === '/' ? ' Locations' :
                            router.pathname === '/forecasting' ? ' Forecasting' :
                                router.pathname === '/historical' ? ' Historical' :
                                    router.pathname === '/cash' ? ' Cash'
                                        : ''}
                    </p>
                    <FontAwesomeIcon icon={faXmark} onClick={() => setIsOpen(!isOpen)} className='cl-primary-hover cursor-pointer' />
                </div>
            </div>

            {/* Body  */}

            <ul className='filter-body px-4'>

                {
                    router.pathname === '/forecasting' ?
                        <FilterList atms={atms} cities={cities} branches={branches} types={types} city={city} setCity={setCity} branch={branch} setBranch={setBranch} type={type} setType={setType} atm={atm} setAtm={setAtm} filterAction={filterForecasts} /> :
                        router.pathname === '/historical' ?
                            <FilterList atms={atms} cities={cities} branches={branches} types={types} city={cityHis} setCity={setCityHis} branch={branchHis} setBranch={setBranchHis} type={typeHis} setType={setTypeHis} atm={atmHis} setAtm={setAtmHis} filterAction={filterHistorical} /> :
                            router.pathname === '/cash' ?
                                <FilterList atms={atms} cities={cities} branches={branches} types={types} city={cityCash} setCity={setCityCash} branch={branchCash} setBranch={setBranchCash} type={typeCash} setType={setTypeCash} atm={atmCash} setAtm={setAtmCash} filterAction={filterCash} /> :
                                router.pathname === '/' ?
                                    <FilterList atms={atms} cities={cities} branches={branches} types={types} city={cityL} setCity={setCityL} branch={branchL} setBranch={setBranchL} type={typeL} setType={setTypeL} atm={atmL} setAtm={setAtmL} filterAction={filterCash} /> : ''
                }

            </ul>

            {/* Footer */}

            <div className='filter-footer h-[70px] flex justify-end'>
                <div className='flex mr-4'>
                    <h1 className='mt-[18px] mr-4 font-bold' onClick={onClearALL} > Clear all </h1>
                    <button className='btn-head mt-2' onClick={onFilterData} > FILTER </button>
                </div>
            </div>


        </Box>
    );


    const onFilterData = () => {

        if (router.pathname === '/forecasting') {

            filterForecasts(atm, atms);

        } else if (router.pathname === '/historical') {

            filterHistorical(atmHis, from, until, atms);

        } else if (router.pathname === '/cash') {

            filterCash(atmCash, fromCash, untilCash)

        } else if (router.pathname === '/') {

            filterLocation(atmL)

        }

        setIsOpen(false);

    }

    const onClearALL = () => {

        if (router.pathname === '/forecasting') {

            setCity(defaultAtmF.municipality);
            setBranch(defaultAtmF.responsibleBranch);
            setType(defaultAtmF.LocationType);
            setAtm(defaultAtmF.atmId);

        } else if (router.pathname === '/historical') {

            setCityHis(defaultAtmH.municipality);
            setBranchHis(defaultAtmH.responsibleBranch);
            setTypeHis(defaultAtmH.LocationType);
            setAtmHis(defaultAtmH.atmId);

        } else if (router.pathname === '/cash') {

            setCityCash(defaultAtmC.municipality);
            setBranchCash(defaultAtmC.responsibleBranch);
            setTypeCash(defaultAtmC.LocationType);
            setAtmCash(defaultAtmC.atmId);

        } else if (router.pathname === '/') {

            setCityL(defaultAtmL.municipality);
            setBranchL(defaultAtmL.responsibleBranch);
            setTypeL(defaultAtmL.LocationType);
            setAtmL(defaultAtmL.atmId);

        }

        setIsOpen(false);
    }


    return (
        <div>

            {/* Head  */}
            <div className='w-full flex justify-center mt-8'>

                <div className='w-11/12 flex justify-between'>

                    <div>
                        <h3 className='ft-22 font-bold tracking-tighter text-[#1c273c]'>
                            ATM code :
                            {
                                router.pathname === '/' ? defaultAtmL.code :
                                    router.pathname === '/forecasting' ? defaultAtmF.code :
                                        router.pathname === '/historical' ? defaultAtmH.code :
                                            router.pathname === '/cash' ? defaultAtmC.code :
                                                'Not Selected'
                            }
                        </h3>
                        <p className='text-sm text-slate-500'> This report is based on current ATM data. </p>
                    </div>

                    <div className='hidden md:flex'>

                        <div className='hidden lg:flex'>
                            {
                                router.pathname === '/forecasting' ?
                                    <ForecastsHead city={city} branch={branch} atm={defaultAtmF.code} loadingF={loadingF} /> :
                                    router.pathname === '/historical' ?
                                        <HistoricalHead city={cityHis} branch={branchHis} atm={defaultAtmH.code} loadingH={loadingH} /> :
                                        router.pathname === '/cash' ?
                                            <CashHead city={cityCash} branch={branchCash} atm={defaultAtmC.code} loadingC={loadingC} /> :
                                            router.pathname === '/' ?
                                                <LocationsHead city={cityL} branch={branchL} atm={defaultAtmL.code} loadingL={loadingL} /> : ''
                            }
                        </div>


                        {/* Button  */}
                        {
                            router.pathname === '/' ?
                                <button className='btn-head-white mt-1 mr-3' onClick={() => clearFilter()}> CLEAR </button> : ''
                        }

                        <button className='btn-head mt-1' onClick={() => setIsOpen(!isOpen)}> FILTER </button>


                        <Drawer
                            anchor='right'
                            open={isOpen}
                            onClose={() => setIsOpen(!isOpen)}
                        >
                            {list()}
                        </Drawer>


                    </div>


                    {/* Open Drawer  */}

                    {
                        isOpen
                            || (150 > scrollPosition && width >= 768) ? '' :
                            <div className='filter-open cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                                <FontAwesomeIcon icon={faAnglesLeft} className='' />
                            </div>
                    }
                </div>
            </div>

            {/* Error Message  */}

            <DisplayError error={error} />

            {/* Body  */}
            <div className='w-full flex justify-center mt-8'>
                <div className='head-body w-11/12 flex justify-between'>
                    <div className='flex'>
                        {
                            sections.map(elm => (
                                <LinkScroll activeClass="active" to={`${elm.id}`} spy={true} smooth={true} duration={500} className='cursor-pointer'>
                                    {elm.title}
                                </LinkScroll>
                            ))
                        }
                    </div>
                    <div className='hidden lg:flex'>

                        {
                            router.pathname === '/' ? '' :
                                <Link href="/">
                                    <a>
                                        <FontAwesomeIcon icon={faMapPin} />
                                        Home
                                    </a>
                                </Link>
                        }

                        {
                            router.pathname === '/forecasting' ? '' :
                                <Link href="/forecasting">
                                    <a>
                                        <FontAwesomeIcon icon={faChartLine} />
                                        Forecasting
                                    </a>
                                </Link>
                        }


                        {
                            router.pathname === '/historical' ? '' :
                                <Link href="/historical">
                                    <a>
                                        <FontAwesomeIcon icon={faFileWaveform} />
                                        Historical Analysis
                                    </a>
                                </Link>
                        }


                        {
                            router.pathname === '/cash' ? '' :
                                <Link href="/cash">
                                    <a >
                                        <FontAwesomeIcon icon={faWallet} />
                                        Cash Management
                                    </a>
                                </Link>
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header