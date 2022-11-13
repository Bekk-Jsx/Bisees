import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'



import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});


const tooltipFormatter = (value, name) => {
    return formatter.format(value).split('.')[0];
}



const Performance = ({ current, metaData, total, defaultAtmF }) => {

    let data = [];


    current.forEach(elm => {

        let date = new Date(elm.date);
        let createdAt = date.toLocaleString('default', { day: 'numeric', month: 'short' });

        data.push({ name: createdAt, uv: elm.withdr_amnt, pv: elm.withdr_amnt_pred })

    });


    let date1 = new Date(current[0].date);
    let date2 = new Date(current[current.length - 1].date);


    let from = date1.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })
    let until = date2.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })


    return (
        <div>

            {/* Meta Data  */}

            <div className='w-full flex justify-center mt-8'>

                <div className='w-11/12 flex flex-col md:flex-row justify-between gap-9'>

                    <div className='hidden lg:flex meta-card w-1/4 justify-between bg-[#D653C1]'>
                        <div className='text-[#fff] my-auto bg-icon'>
                            <FontAwesomeIcon icon={faDollarSign} />
                        </div>
                        <div>
                            <h4 className='uppercase text-[#fff] text-xs font-bold text-right'> Total Forecasting </h4>
                            <h1 className='text-[35px] text-[#fff] text-right my-2 font-bold'> {formatter.format(total).split('.')[0]} </h1>
                            <p className='text-[#fff] ft-10 text-right'>  The Next 7 Days </p>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 lg:w-1/4 meta-card card-white bg-[#fff] '>
                        <h4 className='uppercase text-[#1c273c] text-xs font-bold'> Overall RMSE </h4>
                        <h1 className='text-[35px] text-[#1c273c] font-bold mb-1'> {metaData.rmse.toFixed(4)} </h1>
                        <BorderLinearProgress className={metaData.rmse > 0.5 ? 'bar-danger' : metaData.rmse > 0.25 ? 'bar-warning' : 'bar-success'} variant="determinate" value={metaData.rmse * 100} />
                        <p className='ft-10 text-slate-500 mt-1'> Testing Mood </p>
                    </div>

                    <div className='w-full md:w-1/3 lg:w-1/4 meta-card card-white bg-[#fff] '>
                        <h4 className='uppercase text-[#1c273c] text-xs font-bold'> S1D99613 RMSE </h4>
                        <h1 className='text-[35px] text-[#1c273c] font-bold mb-1'> {metaData.mse.toFixed(4)} </h1>
                        <BorderLinearProgress className={metaData.mse > 0.5 ? 'bar-danger' : metaData.mse > 0.25 ? 'bar-warning' : 'bar-success'} variant="determinate" value={metaData.mse * 100} />
                        <p className='ft-10 text-slate-500 mt-1'> Testing Mood </p>
                    </div>

                    <div className='w-full md:w-1/3 lg:w-1/4 meta-card card-white bg-[#fff] '>
                        <h4 className='uppercase text-[#1c273c] text-xs font-bold'> S1D99613 MAPE </h4>
                        <h1 className='text-[35px] text-[#1c273c] font-bold mb-1'> {metaData.mape.toFixed(4)} </h1>
                        <BorderLinearProgress className={metaData.mape > 0.5 ? 'bar-danger' : metaData.mape > 0.25 ? 'bar-warning' : 'bar-success'} variant="determinate" value={metaData.mape * 100} />
                        <p className='ft-10 text-slate-500 mt-1'> Testing Mood </p>
                    </div>


                </div>

            </div>


            {/* Performance  */}
            <div className='w-full flex justify-center mt-8' id='section-performance'>
                <div className='line-performance w-11/12 card-border'>

                    <div className='h-1/6 mb-5 lg:mb-auto'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Test Performance - ATM Code: {defaultAtmF.code} - {from} - {until}</h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> This Prediction Views report is based on current Atm. </p>
                    </div>

                    <div className='h-5/6'>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={500} height={1000} data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                                <YAxis />
                                <Tooltip formatter={tooltipFormatter} />
                                <Legend />
                                <Line type="monotone" dataKey="uv" name="actual" stroke="#5F18D3" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="pv" name="predicted" stroke="#76B4FE" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>

        </div>


    )
}

export default Performance