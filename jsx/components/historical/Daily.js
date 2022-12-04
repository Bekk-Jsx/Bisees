import { } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartColumn, faArrowTrendUp, faRankingStar, faChartLine, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'

import DateRangePicker from 'react-bootstrap-daterangepicker';

import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';

import moment from 'moment';

import 'bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css';


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});


const tooltipFormatter = (value, name) => {
    return formatter.format(value).split('.')[0];
}


const Daily = ({ currentDaily, currentMetaData, topAtm, startDate, setStartDate, endDate, setEndDate, from, until, filterHistorical, defaultAtmH, atms }) => {


    let data = [];

    currentDaily.forEach(elm => {

        // define data line
        let date = new Date(elm.date);
        let createdAt = date.toLocaleString('default', { day: 'numeric', month: 'short' });
        data.push({ name: createdAt, uv: elm.withdrAmnt })
    });


    let date1 = new Date(startDate);
    let startDateAt = date1.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });

    let date2 = new Date(endDate);
    let endDateAt = date2.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });


    const onFilterData = () => {
        filterHistorical(defaultAtmH.atmId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), atms);
    }



    let date3 = new Date(from);
    let date4 = new Date(until);


    let fromAt = date3.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })
    let untilAt = date4.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })




    return (
        <div className="w-full flex justify-center mt-8" id='section-daily'>
            <div className='w-11/12 flex flex-col lg:flex-row justify-between gap-7'>

                <div className='w-full lg:w-1/3'>

                    <div className='card-border date-range' >

                        <h3 className='font-bold tracking-tighter text-[#1c273c]'> Views By Date Range </h3>
                        <p className='text-sm text-slate-500'> Select date range to display. </p>
                        <br />

                        <DateRangePicker
                            initialSettings={{ startDate, endDate }}
                            onCallback={(start, end) => { setStartDate(moment(start._d).format('MM/DD/YYYY')); setEndDate(moment(end._d).format('MM/DD/YYYY')); }}
                        >
                            <input type="text" className="form-control" />
                        </DateRangePicker>


                        <div className='filter-range flex justify-end mt-2'>
                            <div className='flex mr-4'>
                                <button className='btn-head mt-2' onClick={onFilterData} > FILTER </button>
                            </div>
                        </div>
                    </div>

                    <div className='card-border mt-6 data-seven'>

                        <h3 className='font-bold tracking-tighter text-[#1c273c]'> Top ATM </h3>
                        <p className='text-sm text-slate-500'> The ATM that has more activity in the last 365 days </p>
                        <br />

                        <div className='flex mt-6'>
                            <div className='w-1/2 flex'>
                                <FontAwesomeIcon icon={faRankingStar} className='bg-[#3366FF]' />
                                <div>
                                    <p className='text-xs text-slate-500'> ATM ID </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {topAtm.code} </h3>
                                </div>
                            </div>
                            <div className='w-1/2 flex'>
                                <FontAwesomeIcon icon={faChartLine} className='bg-[#6F42C1]' />
                                <div>
                                    <p className='text-xs text-slate-500'> Withdrawal Amount </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {formatter.format(topAtm.withdrAmnt).split('.')[0]} </h3>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='card-border mt-6 data-seven'>

                        <h3 className='font-bold tracking-tighter text-[#1c273c]'> Last 7 Days' Withdrawals  </h3>
                        <p className='text-sm text-slate-500'> This Withdrawals report is based on current Atm. </p>
                        <br />

                        <div className='flex mt-6'>
                            <div className='w-1/2 flex'>
                                <FontAwesomeIcon icon={faChartColumn} className='bg-[#6F42C1]' />
                                <div>
                                    <p className='text-xs text-slate-500'> Withdrawal Amount </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {formatter.format(currentMetaData['7_day'].withdrAmnt).split('.')[0]} </h3>
                                </div>
                            </div>
                            <div className='w-1/2 flex'>
                                {
                                    0 > currentMetaData['7_day'].pctIncrease ?
                                        <FontAwesomeIcon icon={faArrowTrendDown} className='bg-[#D00E0E]' /> :
                                        <FontAwesomeIcon icon={faArrowTrendUp} className='bg-[#D653C1]' />
                                }


                                <div>
                                    <p className='text-xs text-slate-500'> Pctincrease </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {currentMetaData['7_day'].pctIncrease}% </h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-full lg:w-2/3 card-border overflow-y-hidden overflow-x-auto md:overflow-x-hidden'>

                    <div className='h-1/6 mb-5 lg:mb-auto lg:mb-auto min-w-[700px] md:min-w-[0px]'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Daily Withdrawal Amount  - ATM code: {defaultAtmH.code} - {fromAt} - {untilAt} </h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> This Views report is based on current Atm. </p>
                    </div>

                    <div className='h-5/6 lg:mb-auto min-w-[700px] md:min-w-[0px]'>

                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                width={500}
                                height={400}
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" interval={Number((currentDaily.length / 8).toFixed(0))} />
                                <YAxis />
                                <Tooltip formatter={tooltipFormatter} />
                                <Area type="monotone" dataKey="uv" name="Withdrawal Amount" stroke="#5F18D3" fill="#F6F3FD" />
                                {/* <Line type="monotone" dataKey="uv" tooltipType='none' stroke="#5F18D3" /> */}
                            </ComposedChart>
                        </ResponsiveContainer>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Daily