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




const labelFormatter = (value, array) => {

    if (array && array.length) {
        return array[0].payload.name2

    }

    return value;
}



const Features = ({ current, tops, defaultAtmF }) => {

    let data = [];
    let dataTops = [];


    current.forEach(elm => {

        data.push({ name: elm.feature, uv: elm.value })

    });

    tops.forEach(elm => {

        dataTops.push({ name: elm.code, name2: elm.name || elm.code, uv: elm.rmse, code: elm.code })

    });




    return (
        <div className="w-full flex justify-center mt-8" id='section-features'>
            <div className='w-11/12 flex flex-col lg:flex-row justify-between gap-7'>

                <div className="w-full lg:w-1/2 card-border line-features">

                    <div className='mb-5 lg:mb-auto'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Feature Importances </h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> This Prediction Views report is based on current Atm. </p>
                    </div>

                    <div className='h-92 mt-5'>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                layout="vertical"
                                width={300}
                                height={1400}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 70,
                                }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Area dataKey="uv" fill="#F6F3FD" stroke="#5F18D3" name="Value" />
                                <Bar dataKey="uv" barSize={20} fill="#5F18D3" tooltipType='none' />
                                <Line dataKey="uv" stroke="#76B4FE" tooltipType='none' />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 card-border line-features overflow-y-hidden overflow-x-auto md:overflow-x-hidden">
                    <div className='h-1/6 lg:mb-auto min-w-[700px] md:min-w-[0px]'>
                        <h3 className='ml-5 font-bold text-[#1c273c] text-lg'> Top 10 ATMs </h3>
                        <p className='ml-5 mt-2 text-sm text-slate-500'> Atms that got less RMSE on the Test.  </p>
                    </div>
                    <div className='h-5/6 min-w-[700px] md:min-w-[0px]'>
                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart
                                width={300}
                                height={1400}
                                data={dataTops}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" type="category" interval={0} angle={-12} />
                                <YAxis />
                                <Tooltip labelFormatter={labelFormatter} />
                                <Bar dataKey="uv" fill="#5F18D3" name="RMSE" >
                                    {dataTops.map((doc) => (
                                        <Cell fill={doc.code === defaultAtmF.code ? `#D653C1` : `#5F18D3`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features