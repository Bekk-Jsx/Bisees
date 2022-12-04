import {
    BarChart,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});


const labelFormatter = (value, array) => {

    if (array && array.length) {
        return array[0].payload.name2

    }

    return value;
}


const tooltipFormatter = (value, name) => {
    return formatter.format(value).split('.')[0];
}



const Yearly = ({ currentYearly, currentTopAtmsByWithdr, defaultAtmH }) => {

    let data = [];
    let dataTops = [];


    currentYearly.forEach(elm => {

        data.push({ name: elm.date, uv: elm.withdrAmnt })

    });



    currentTopAtmsByWithdr.forEach(elm => {

        dataTops.push({ name: elm.code, name2: elm.name || elm.code, uv: elm.withdrAmnt, code: elm.code })

    });


    return (
        <div className="w-full flex justify-center mt-8" id='section-yearly'>
            <div className='w-11/12 flex flex-col lg:flex-row justify-between gap-7'>
                <div className="w-full lg:w-1/2 card-border line-total overflow-y-hidden overflow-x-auto md:overflow-x-hidden">

                    <div className='mb-5 lg:mb-auto lg:mb-auto min-w-[500px] md:min-w-[0px]'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Top 5 ATMs by Withdrawal Amount in the last 365-Day </h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> Atms that got more Withdrawal Amount. </p>
                    </div>

                    <div className='h-[450px] mt-5 lg:mb-auto min-w-[500px] md:min-w-[0px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                layout="vertical"
                                width={300}
                                height={500}
                                data={dataTops}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip labelFormatter={labelFormatter} formatter={tooltipFormatter} />
                                <Area dataKey="uv" fill="#F6F3FD" stroke="#5F18D3" name="Withdrawal Amount" />
                                {/* dataTops */}
                                <Bar dataKey="uv" barSize={40} fill="#5F18D3" tooltipType='none' >
                                    {dataTops.map((doc) => (
                                        <Cell fill={doc.code === defaultAtmH.code ? `#D653C1` : `#5F18D3`} />
                                    ))}
                                </Bar>
                                <Line dataKey="uv" stroke="#76B4FE" tooltipType='none' />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                </div>
                <div className="w-full lg:w-1/2 card-border line-total">

                    <div className='lg:mb-auto'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Yearly Withdrawal Amount </h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500 mb-6'> Atms that got more Withdrawal Amount.  </p>
                    </div>

                    <div className='h-[450px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={300}
                                height={1400}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={tooltipFormatter} />
                                <Bar dataKey="uv" name="Withdrawal Amount" fill="#5F18D3" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Yearly