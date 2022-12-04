import React, { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faFileWaveform, faWallet, faXmark, faMapPin } from '@fortawesome/free-solid-svg-icons'


import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import Image from 'next/image'

import BissesLogo from '../../img/Bisees_Logo.jpg'



const Navbar = () => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const list = () => (
        <Box
            sx={{ width: 290 }}
            role="presentation"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={() => setIsOpen(!isOpen)}
        >
            <div className='drawer-header w-full flex justify-center'>
                <div className='w-11/12 flex justify-between'>
                    {/* <p className='nav-logo'> Bisees </p> */}
                    <Image
                        src={BissesLogo}
                        width={150}
                        height={60}
                    />
                    <FontAwesomeIcon icon={faXmark} className='cl-primary-hover cursor-pointer' />
                </div>
            </div>

            <ul className='flex flex-col'>

                <Link href="/">
                    <a className={`mr-4 nav-link ${router.pathname === '/' ? 'drawer-current-nav' : ''}`}>
                        <FontAwesomeIcon icon={faMapPin} />
                        Home
                    </a>
                </Link>

                <Link href="/forecasting">
                    <a className={`mr-4 nav-link ${router.pathname === '/forecasting' ? 'drawer-current-nav' : ''}`}>
                        <FontAwesomeIcon icon={faChartLine} />
                        Forecasting
                    </a>
                </Link>

                <Link href="/historical">
                    <a className={`mr-4 nav-link ${router.pathname === '/historical' ? 'drawer-current-nav' : ''}`}>
                        <FontAwesomeIcon icon={faFileWaveform} />
                        Historical Analysis
                    </a>
                </Link>

                <Link href="/cash">
                    <a className={`mr-4 nav-link ${router.pathname === '/cash' ? 'drawer-current-nav' : ''}`}>
                        <FontAwesomeIcon icon={faWallet} />
                        Cash Management
                    </a>
                </Link>

            </ul>


        </Box>
    );

    return (
        <div className='Navbar w-full flex justify-center bg-white'>
            <div className='w-11/12 flex justify-between'>

                <svg className="block lg:hidden nav-svg-icon cl-primary-hover cursor-pointer" onClick={() => setIsOpen(true)} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M916.6 210.2H107.4c-17.7 0-32-14.3-32-32s14.3-32 32-32h809.2c17.7 0 32 14.3 32 32s-14.3 32-32 32zM714.3 544H107.4c-17.7 0-32-14.3-32-32s14.3-32 32-32h606.9c17.7 0 32 14.3 32 32s-14.3 32-32 32zM916.6 877.8H107.4c-17.7 0-32-14.3-32-32s14.3-32 32-32h809.2c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>

                <div className='nav-logo' >
                    {
                        isOpen ? '' : <Image
                            src={BissesLogo}
                            width={150}
                            height={60}
                        />
                    }
                </div>

                <ul className='hidden lg:flex'>

                    <Link href="/">
                        <a className={`py-4 mr-4 nav-link nav-link-fade-up ${router.pathname === '/' ? 'current-nav' : ''}`}>
                            <FontAwesomeIcon icon={faMapPin} />
                            Home
                        </a>
                    </Link>

                    <Link href="/forecasting">
                        <a className={`py-4 mr-4 nav-link nav-link-fade-up ${router.pathname === '/forecasting' ? 'current-nav' : ''}`}>
                            <FontAwesomeIcon icon={faChartLine} />
                            Forecasting
                        </a>
                    </Link>

                    <Link href="/historical">
                        <a className={`py-4 mr-4 nav-link nav-link-fade-up ${router.pathname === '/historical' ? 'current-nav' : ''}`}>
                            <FontAwesomeIcon icon={faFileWaveform} />
                            Historical Analysis
                        </a>
                    </Link>

                    <Link href="/cash">
                        <a className={`py-4 mr-4 nav-link nav-link-fade-up ${router.pathname === '/cash' ? 'current-nav' : ''}`}>
                            <FontAwesomeIcon icon={faWallet} />
                            Cash Management
                        </a>
                    </Link>

                </ul>

                <Drawer
                    anchor='left'
                    open={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                >
                    {list()}
                </Drawer>
            </div>
        </div >
    )
}

export default Navbar