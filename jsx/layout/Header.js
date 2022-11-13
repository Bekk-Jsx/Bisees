import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as LinkScroll } from 'react-scroll'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faFileWaveform, faWallet, faXmark, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import FilterList from './FilterList'
import ForecastsHead from './ForecastsHead'
import HistoricalHead from './HistoricalHead'
import CashHead from './CashHead'

import DisplayError from './DisplayError'


const sections1 = [{ title: 'Forcasting', id: 'section-prediction' }, { title: 'Performance', id: 'section-performance' }, { title: 'Features', id: 'section-features' }];
const sections2 = [{ title: 'Daily Withdrawals', id: 'section-daily' }, { title: 'Total Withdrawals', id: 'section-total' }, { title: 'Yearly Withdrawals', id: 'section-yearly' }];
const sections3 = [{ title: 'Replenishment', id: 'section-replenishment' }];





const Header = ({ atms, cities, branches, from, until, fromCash, untilCash, types, defaultAtmF, defaultAtmH, defaultAtmC, filterForecasts, filterHistorical, filterCash, loadingF, loadingH, loadingC, error }) => {

    const router = useRouter();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(false);

    const [city, setCity] = useState(defaultAtmF.municipality);
    const [branch, setBranch] = useState(defaultAtmF.responsibleBranch);
    const [type, setType] = useState(defaultAtmF.LocationType);
    const [atm, setAtm] = useState(defaultAtmF.atmId);

    const [cityHis, setCityHis] = useState(defaultAtmH.municipality);
    const [branchHis, setBranchHis] = useState(defaultAtmH.responsibleBranch);
    const [typeHis, setTypeHis] = useState(defaultAtmH.LocationType);
    const [atmHis, setAtmHis] = useState(defaultAtmH.atmId);

    const [cityCash, setCityCash] = useState(defaultAtmC.municipality);
    const [branchCash, setBranchCash] = useState(defaultAtmC.responsibleBranch);
    const [typeCash, setTypeCash] = useState(defaultAtmC.LocationType);
    const [atmCash, setAtmCash] = useState(defaultAtmC.atmId);

    const sections = router.pathname === '/' ? sections1 : router.pathname === '/historical' ? sections2 : router.pathname === '/cash' ? sections3 : [];

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

    }, [isOpen, defaultAtmF, defaultAtmH, defaultAtmC]);

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
                        {router.pathname === '/' ? ' Forecasting' :
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
                    router.pathname === '/' ?
                        <FilterList atms={atms} cities={cities} branches={branches} types={types} city={city} setCity={setCity} branch={branch} setBranch={setBranch} type={type} setType={setType} atm={atm} setAtm={setAtm} filterAction={filterForecasts} /> :
                        router.pathname === '/historical' ?
                            <FilterList atms={atms} cities={cities} branches={branches} types={types} city={cityHis} setCity={setCityHis} branch={branchHis} setBranch={setBranchHis} type={typeHis} setType={setTypeHis} atm={atmHis} setAtm={setAtmHis} filterAction={filterHistorical} /> :
                            router.pathname === '/cash' ?
                                <FilterList atms={atms} cities={cities} branches={branches} types={types} city={cityCash} setCity={setCityCash} branch={branchCash} setBranch={setBranchCash} type={typeCash} setType={setTypeCash} atm={atmCash} setAtm={setAtmCash} filterAction={filterCash} /> : ''
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

        if (router.pathname === '/') {

            filterForecasts(atm, atms);

        } else if (router.pathname === '/historical') {

            filterHistorical(atmHis, from, until, atms);

        } else if (router.pathname === '/cash') {

            filterCash(atmCash, fromCash, untilCash)

        }

        setIsOpen(false);

    }

    const onClearALL = () => {

        if (router.pathname === '/') {

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
                            {router.pathname === '/' ? defaultAtmF.code : router.pathname === '/historical' ? defaultAtmH.code : router.pathname === '/cash' ? defaultAtmC.code : 'Not Selected'}
                        </h3>
                        <p className='text-sm text-slate-500'> This report is based on current ATM data. </p>
                    </div>

                    <div className='hidden md:flex'>

                        {
                            router.pathname === '/' ?
                                <ForecastsHead city={city} branch={branch} atm={defaultAtmF.code} loadingF={loadingF} /> :
                                router.pathname === '/historical' ?
                                    <HistoricalHead city={cityHis} branch={branchHis} atm={defaultAtmH.code} loadingH={loadingH} /> :
                                    router.pathname === '/cash' ?
                                        <CashHead city={cityCash} branch={branchCash} atm={defaultAtmC.code} loadingC={loadingC} /> : ''
                        }


                        {/* Button  */}
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
                    <div className='hidden md:flex'>

                        {
                            router.pathname === '/' ? '' :
                                <Link href="/">
                                    <a className={`${router.pathname === '/historical' ? '' : ''}`}>
                                        <FontAwesomeIcon icon={faChartLine} />
                                        Forcasting
                                    </a>
                                </Link>
                        }


                        {
                            router.pathname === '/historical' ? '' :
                                <Link href="/historical">
                                    <a className={`${router.pathname === '/historical' ? '' : ''}`}>
                                        <FontAwesomeIcon icon={faFileWaveform} />
                                        Historical Analysis
                                    </a>
                                </Link>
                        }


                        {
                            router.pathname === '/cash' ? '' :
                                <Link href="/cash">
                                    <a className={`${router.pathname === '/cash' ? '' : ''}`}>
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