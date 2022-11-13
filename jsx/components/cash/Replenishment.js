import { } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar, faMoneyBillTrendUp, faCalendarDay, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { Area, XAxis, YAxis, CartesianGrid, Tooltip as TooltipRecharts, ResponsiveContainer, ComposedChart, Line } from 'recharts';

import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css';

const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}

const incldues = (arr, value, key = "date") => {
    return arr.find((elm) => {
        return elm[key] === value ? elm[key] : undefined;
    });
};

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});


const tooltipFormatter = (value) => {

    return formatter.format(value).split('.')[0];
}


const labelFormatter = (value, array) => {

    if (array && array.length) {
        return array[0].payload.name2

    }

    return value;
}




const Replenishment = ({ replenishment, currentMetaData, currentNextFulfill, defaultAtmC, startDate, setStartDate, endDate, setEndDate, filterCash, fromCash, untilCash, }) => {

    let data = [], nextFullFit;
    nextFullFit = currentNextFulfill[0] && currentNextFulfill[0]?.amnt ? currentNextFulfill[0]?.amnt : 'Not Available';

    replenishment.forEach(elm => {

        let date = new Date(elm.date);
        let fullFillAt = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        let fullFillAt2 = date.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });

        data.push({ name: fullFillAt, name2: fullFillAt2, uv: elm.money_fulfilled });


    });

    let date = new Date(currentMetaData.nextFulfillDate.date);
    let fullFillAt = date.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });

    let today = new Date();

    let todayAt = today.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
    let todayTitle = today.toLocaleString('default', { month: 'short', year: 'numeric' });
    let todayYear = today.toLocaleString('default', { year: 'numeric' });
    let todayMonth = today.toLocaleString('default', { month: 'numeric' });
    let todayDayShort = today.toLocaleString('default', { weekday: 'short' });
    let todayDayNum = today.toLocaleString('default', { day: 'numeric' });


    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let calendarDays = []

    // get white space

    for (let i = 0; i < days.indexOf(todayDayShort); i++) {
        calendarDays.push(null);
    }

    // add elements

    const daysInCurrentMonth = getDaysInMonth(todayYear, todayMonth);

    let todayDayNumCopy = todayDayNum;

    for (let i = 0; i < 30; i++) {

        todayDayNumCopy = todayDayNumCopy > daysInCurrentMonth ? 1 : todayDayNumCopy;


        let someDate = new Date();
        let result = new Date(someDate.setDate(someDate.getDate() + i));
        let current = incldues(currentNextFulfill, moment(result).format('YYYY-MM-DD'));

        calendarDays.push({ day: Number(todayDayNumCopy), active: current || i === 0 ? true : false, value: current?.amnt, today: i === 0 ? true : false });

        todayDayNumCopy++;


    }


    const onFilterData = () => {
        filterCash(defaultAtmC.atmId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
    }



    let date3 = new Date(fromCash);
    let date4 = new Date(untilCash);


    let fromAt = date3.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })
    let untilAt = date4.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })


    return (
        <div className="w-full flex justify-center mt-8" id='section-replenishment'>
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

                    <div className='card-border data-seven mt-6'>

                        <h3 className='font-bold tracking-tighter text-[#1c273c]'> ATM Details </h3>
                        <p className='text-sm text-slate-500'> This Prediction Views report is based on current Atm. </p>
                        <br />

                        <div className='flex mt-6'>
                            <div className='w-1/2 flex'>
                                <FontAwesomeIcon icon={faSackDollar} className='bg-[#3366FF]' />
                                <div>
                                    <p className='text-xs text-slate-500'> Remaining Amount </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {formatter.format(currentMetaData.remainingAmntLive).split('.')[0]} </h3>
                                </div>
                            </div>
                            <div className='w-1/2 flex'>
                                <FontAwesomeIcon icon={faCalendarDay} className='bg-[#6F42C1]' />
                                <div>
                                    <p className='text-xs text-slate-500'> Today </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {todayAt} </h3>
                                </div>
                            </div>
                        </div>

                        <div className='flex mt-12'>

                            <div className='w-1/2 flex'>
                                <FontAwesomeIcon icon={faCalendarWeek} className='bg-[#6F42C1]' />
                                <div>
                                    <p className='text-xs text-slate-500'> Next Replenishment </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {fullFillAt} </h3>
                                </div>
                            </div>

                            <div className='w-1/2 flex'>
                                <FontAwesomeIcon icon={faMoneyBillTrendUp} className='bg-[#D653C1]' />
                                <div>
                                    <p className='text-xs text-slate-500'> Amount Estimated </p>
                                    <h3 className='text-lg font-bold tracking-tighter text-[#1c273c]'> {formatter.format(nextFullFit).split('.')[0]} </h3>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='card-border mt-6'>

                        <h3 className='font-bold tracking-tighter text-[#1c273c]'> Next Refill Dates </h3>
                        <p className='text-sm text-slate-500'> This Prediction Views report is based on current Atm. </p>
                        <br />

                        <div className='rep-calendar'>

                            <h3 className='font-bold  text-[#1c273c]'> {todayTitle} </h3>

                            <div className='w-full flex mt-4'>
                                {
                                    days.map(day => <p className='w-[14.28%] text-sm text-center text-[#666666]'> {day} </p>)
                                }
                            </div>

                            <div className='w-full flex flex-wrap'>
                                {
                                    calendarDays.map(elm =>
                                        <BootstrapTooltip title={elm?.value ? `Estimated Money To Refill: ${formatter.format(elm?.value).split('.')[0]}` : elm?.today ? 'Today Date' : ''} arrow={false} placement="top">
                                            <p className={
                                                `w-[14.28%] text-center text-sm mb-1 ${elm?.value ? 'rep-calendar-active' : ''} ${elm?.today ? 'rep-calendar-today' : ''}`
                                            }> {elm?.day} </p>
                                        </BootstrapTooltip>
                                    )
                                }
                            </div>


                        </div>


                    </div>
                </div>

                <div className='w-full lg:w-2/3 card-border'>

                    <div className='h-1/6 mb-5 lg:mb-auto'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Replenishment Dates - ATM code : {defaultAtmC.code} - {fromAt} - {untilAt} </h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> This Views report is based on current Atm. </p>
                    </div>

                    <div className='h-5/6'>

                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                width={500}
                                height={400}
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />
                                <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} tickCount={10} />

                                <TooltipRecharts formatter={tooltipFormatter} labelFormatter={labelFormatter} />
                                <Area type="monotone" dataKey="uv" name="Fulfill Amount" stroke="#5F18D3" fill="#F6F3FD" />
                                <Line type="monotone" dataKey="uv" tooltipType='none' stroke="#5F18D3" />
                            </ComposedChart>
                        </ResponsiveContainer>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Replenishment