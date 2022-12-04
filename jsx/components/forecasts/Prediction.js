import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';



const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});


const tooltipFormatter = (value, name) => {
    return formatter.format(value).split('.')[0];
}

const Prediction = ({ current, total, data, defaultAtmF }) => {




    return (
        <div className='w-full flex justify-center mt-8' id='section-prediction'>
            <div className='w-11/12 flex justify-between gap-7'>
                <div className='hidden lg:block w-1/3 card-border'>

                    <h3 className='font-bold tracking-tighter text-[#1c273c]'> Prediction Views By Date </h3>
                    <p className='text-sm text-slate-500'> This report is based on 100% real data. </p>
                    <br />


                    <div className='flex justify-between bm-light-border mt-5'>
                        <div className='font-bold text-[#1c273c]'> Total </div>
                        <div>
                            <div className='text-[#5b47fb] text-right font-bold'> {formatter.format(total).split('.')[0]} </div>
                        </div>
                    </div>

                    {
                        current.map(elm => {

                            let date = new Date(elm.date);
                            let createdAt = date.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });

                            return (
                                (
                                    <div className='flex justify-between bm-light-border py-2'>
                                        <div className='font-bold text-[#1c273c]'> {createdAt} </div>
                                        <div>
                                            <div className='text-[#36f] text-right'> {formatter.format(elm.prediction).split('.')[0]} </div>
                                        </div>
                                    </div>
                                )
                            )
                        })
                    }

                </div>
                <div className='w-full lg:w-2/3 card-border overflow-y-hidden overflow-x-auto md:overflow-x-hidden'>

                    <div className='h-1/6 mb-5 lg:mb-auto min-w-[600px] md:min-w-[0px]'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> The next 7-Day Forecasting - ATM code : {defaultAtmF.code}</h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> This Prediction Views report is based on current Atm. </p>
                    </div>

                    <div className='h-5/6 min-w-[600px] md:min-w-[0px]'>
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
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={tooltipFormatter} />
                                <Area type="monotone" dataKey="uv" name="Forecast" stroke="#5F18D3" fill="#F6F3FD" />
                                <Line type="monotone" dataKey="uv" tooltipType='none' stroke="#5F18D3" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prediction