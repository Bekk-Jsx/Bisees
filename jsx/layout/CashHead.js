import { Fragment } from 'react'

const CashHead = ({ city, branch, atm, loadingC }) => {

    return (
        <Fragment>
            <div className='px-5 head-right-border'>
                <h6 className='ft-10 text-slate-500 mt-1'> City </h6>
                <p className='text-sm text-slate-900 font-bold text-[#1c273c]'> {loadingC ? 'Loading...' : city ? city : 'Not Selected'} </p>
            </div>
            <div className='px-5 head-right-border'>
                <h6 className='ft-10 text-slate-500 mt-1'> Branch </h6>
                <p className='text-sm text-slate-900 font-bold text-[#1c273c]'> {loadingC ? 'Loading...' : branch ? branch : 'Not Selected'} </p>
            </div>
            <div className='px-5 mr-9'>
                <h6 className='ft-10 text-slate-500 mt-1'> ATM </h6>
                <p className='text-sm text-slate-900 font-bold text-[#1c273c]'> {loadingC ? 'Loading...' : atm ? atm : 'Not Selected'} </p>
            </div>
        </Fragment>
    );
}

export default CashHead