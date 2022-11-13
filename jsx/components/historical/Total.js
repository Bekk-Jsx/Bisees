import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';



const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));


const abbreviateNumber = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
        { v: 1E3, s: "K" },
        { v: 1E6, s: "M" },
        { v: 1E9, s: "B" },
        { v: 1E12, s: "T" },
        { v: 1E15, s: "P" },
        { v: 1E18, s: "E" }
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});

const tooltipFormatter = (value, name) => {
    return formatter.format(value).split('.')[0];
}


const Total = ({ currentTotal, currentMetaData, startDate, endDate, from, until, defaultAtmH }) => {


    let data = [];


    currentTotal.forEach(elm => {

        let date = new Date(elm.date);
        let createdAt = date.toLocaleString('default', { day: 'numeric', month: 'short' });

        data.push({ name: createdAt, uv: elm.withdrAmnt, pv: elm.EMA1W, mv: elm.SMA1W })

    });


    let date1 = new Date(startDate);
    let startDateAt = date1.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });

    let date2 = new Date(endDate);
    let endDateAt = date2.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });



    let date3 = new Date(from);
    let date4 = new Date(until);


    let fromAt = date3.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })
    let untilAt = date4.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })



    return (
        <div>

            {/* Meta Data  */}

            <div className='w-full flex justify-center mt-8'>

                <div className='w-11/12 flex flex-col md:flex-row justify-between gap-9'>

                    <div className='hidden lg:block w-1/4 meta-card card-white bg-[#6F42C1] '>
                        <h4 className='uppercase text-[#fff] text-xs font-bold'> TOTAL LAST 7-Days </h4>
                        <h1 className='text-[40px] md:text-[25px] lg:text-[35px] text-[#fff] font-bold mb-1'> €{abbreviateNumber(currentMetaData['7_day'].withdrAmnt)} {0 > currentMetaData['7_day'].pctIncrease ? <FontAwesomeIcon icon={faArrowTrendDown} className='text-[25px] text-[#D00E0E]' /> : <FontAwesomeIcon icon={faArrowTrendUp} className='text-[25px] text-[#D653C1]' />}  </h1>
                        <BorderLinearProgress className='bar-pink' variant="determinate" value={currentMetaData['7_day'].pctIncrease > 100 ? 100 : currentMetaData['7_day'].pctIncrease} />
                        <p className='ft-10 text-[#fff] mt-1'> {currentMetaData['7_day'].pctIncrease}% {currentMetaData['7_day'].pctIncrease >= 0 ? 'increase' : 'decrease'} in 7 Days </p>
                    </div>

                    <div className='w-full md:w-1/3 lg:w-1/4 meta-card card-white bg-[#D653C1] '>
                        <h4 className='uppercase text-[#fff] text-xs font-bold'> TOTAL LAST 30-Days </h4>
                        <h1 className='text-[40px] md:text-[25px] lg:text-[35px] text-[#fff] font-bold mb-1'> €{abbreviateNumber(currentMetaData['30_day'].withdrAmnt)} {0 > currentMetaData['30_day'].pctIncrease ? <FontAwesomeIcon icon={faArrowTrendDown} className='text-[25px] text-[#D00E0E]' /> : <FontAwesomeIcon icon={faArrowTrendUp} className='text-[25px] text-[#3366ff]' />} </h1>
                        <BorderLinearProgress className='bar-blue' variant="determinate" value={currentMetaData['30_day'].pctIncrease > 100 ? 100 : currentMetaData['30_day'].pctIncrease} />
                        <p className='ft-10 text-[#fff] mt-1'> {currentMetaData['30_day'].pctIncrease}% {currentMetaData['30_day'].pctIncrease >= 0 ? 'increase' : 'decrease'} in 30 Days </p>
                    </div>

                    <div className='w-full md:w-1/3 lg:w-1/4 meta-card card-white bg-[#D653C1] '>
                        <h4 className='uppercase text-[#fff] text-xs font-bold'> TOTAL LAST 90-Days </h4>
                        <h1 className='text-[40px] md:text-[25px] lg:text-[35px] text-[#fff] font-bold mb-1'> €{abbreviateNumber(currentMetaData['90_day'].withdrAmnt)} {0 > currentMetaData['90_day'].pctIncrease ? <FontAwesomeIcon icon={faArrowTrendDown} className='text-[25px] text-[#D00E0E]' /> : <FontAwesomeIcon icon={faArrowTrendUp} className='text-[25px] text-[#3366ff]' />} </h1>
                        <BorderLinearProgress className='bar-blue' variant="determinate" value={currentMetaData['90_day'].pctIncrease > 100 ? 100 : currentMetaData['90_day'].pctIncrease} />
                        <p className='ft-10 text-[#fff] mt-1'> {currentMetaData['90_day'].pctIncrease}% {currentMetaData['90_day'].pctIncrease >= 0 ? 'increase' : 'decrease'} in 90 Days </p>
                    </div>

                    <div className='w-full md:w-1/3 lg:w-1/4 meta-card card-white bg-[#D653C1] '>
                        <h4 className='uppercase text-[#fff] text-xs font-bold'> TOTAL LAST 365-Days </h4>
                        <h1 className='text-[40px] md:text-[25px] lg:text-[35px] text-[#fff] font-bold mb-1'> €{abbreviateNumber(currentMetaData['365_day'].withdrAmnt)} {0 > currentMetaData['365_day'].pctIncrease ? <FontAwesomeIcon icon={faArrowTrendDown} className='text-[25px] text-[#D00E0E]' /> : <FontAwesomeIcon icon={faArrowTrendUp} className='text-[25px] text-[#3366ff]' />} </h1>
                        <BorderLinearProgress className='bar-blue' variant="determinate" value={currentMetaData['365_day'].pctIncrease > 100 ? 100 : currentMetaData['365_day'].pctIncrease} />
                        <p className='ft-10 text-[#fff] mt-1'> {currentMetaData['365_day'].pctIncrease}% {currentMetaData['365_day'].pctIncrease >= 0 ? 'increase' : 'decrease'} in 365 Days </p>
                    </div>

                </div>

            </div>

            {/* Total Data  */}

            <div className='w-full flex justify-center mt-8' id='section-total'>
                <div className='line-performance w-11/12 card-border line-total'>

                    <div className='h-1/6 mb-5 lg:mb-auto'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Total Daily Withdrawal Amount: {fromAt} - {untilAt}</h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> The Views report is based on current Atm. </p>
                    </div>

                    <div className='h-5/6 mt-4'>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={500} height={1000} data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} interval={Number((currentTotal.length / 9).toFixed(0))} />
                                <YAxis />
                                <Tooltip formatter={tooltipFormatter} />
                                <Legend />
                                <Line type="monotone" dataKey="uv" name="Withdrawal Amount" stroke="#5F18D3" strokeWidth={1} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="mv" name="SMA1W" stroke="#76B4FE" strokeWidth={1} dot={false} />
                                {/* <Line type="monotone" dataKey="pv" name="EMA1W" stroke="#D653C1" strokeWidth={1} dot={false} /> */}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Total