import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faMoneyBill, faSackDollar, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'



const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});

const Cards = ({ locations, selected, branches, currentBranches, remaining, currentrRemaining, estimated, currentrEstimated, setSurviveAtm }) => {


    return (
        <div>
            <div className='w-full flex justify-center mt-8'>
                <div className='w-11/12 flex flex-col lg:flex-row justify-between'>

                    <div className='flex flex-col justify-between md:flex-row w-full lg:w-[49%]' >

                        <div className='flex meta-card w-full md:w-[48%] justify-between bg-[#D653C1] mb-5 lg:mb-[0px]'>
                            <div className='text-[#fff] my-auto bg-icon'>
                                <FontAwesomeIcon icon={faCodeBranch} />
                            </div>
                            <div>
                                <h4 className='uppercase text-[#fff] text-xs font-bold text-right'> All Branches </h4>
                                <h1 className='text-[35px] text-[#fff] text-right my-2 font-bold'>
                                    {
                                        currentBranches.length === 0 ?
                                            branches.length : currentBranches.length
                                    } / {branches.length}
                                </h1>
                                <p className='text-[#fff] ft-10 text-right'>  Selected Branches </p>
                            </div>
                        </div>


                        <div className='flex meta-card w-full md:w-[48%] justify-between bg-[#6F42C1] mb-5 lg:mb-[0px]'>
                            <div className='text-[#fff] my-auto bg-icon'>
                                <FontAwesomeIcon icon={faMoneyBill} />
                            </div>
                            <div>
                                <h4 className='uppercase text-[#fff] text-xs font-bold text-right'> All Atms </h4>
                                <h1 className='text-[35px] text-[#fff] text-right my-2 font-bold'>
                                    {
                                        selected.length === 0 ?
                                            locations.length : selected.length
                                    } / {locations.length}
                                </h1>
                                <p className='text-[#fff] ft-10 text-right'>  Selected Atms </p>
                            </div>
                        </div>

                    </div>

                    <div className='flex flex-col justify-between md:flex-row w-full lg:w-[49%]' >

                        <div className='flex meta-card w-full md:w-[48%] justify-between bg-[#D653C1] mb-5 lg:mb-[0px]'>
                            <div className='text-[#fff] my-auto bg-icon'>
                                <FontAwesomeIcon icon={faSackDollar} />
                            </div>
                            <div>
                                <h4 className='uppercase text-[#fff] text-xs font-bold text-right'> Remaining Amount </h4>
                                <h1 className='text-[35px] text-[#fff] text-right my-2 font-bold'>
                                    {
                                        currentrRemaining === 0 ?
                                            formatter.format(remaining).split('.')[0] : formatter.format(currentrRemaining).split('.')[0]
                                    }
                                </h1>
                                <p className='text-[#fff] ft-10 text-right'>  Selected Atms </p>
                            </div>
                        </div>


                        <div className='flex meta-card w-full md:w-[48%] justify-between bg-[#D653C1] mb-5 lg:mb-[0px]'>
                            <div className='text-[#fff] my-auto bg-icon'>
                                <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                            </div>
                            <div>
                                <h4 className='uppercase text-[#fff] text-xs font-bold text-right'> Amount Estimated </h4>
                                <h1 className='text-[35px] text-[#fff] text-right my-2 font-bold'>
                                    {
                                        currentrEstimated === 0 ?
                                            formatter.format(estimated).split('.')[0] : formatter.format(currentrEstimated).split('.')[0]
                                    }
                                </h1>
                                <p className='text-[#fff] ft-10 text-right'> Selected Atms </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cards