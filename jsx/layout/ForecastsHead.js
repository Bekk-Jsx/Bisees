import { Fragment } from 'react'

const ForecastsHead = ({ city, branch, atm, loadingF }) => {

    return (
        <Fragment>
            <div className='px-5 head-right-border'>
                <h6 className='ft-10 text-slate-500 mt-1'> City </h6>
                <p className='text-sm text-slate-900 font-bold text-[#1c273c]'> {loadingF ? 'Loading...' : city ? city : 'Not Selected'}   </p>
            </div>
            <div className='px-5 head-right-border'>
                <h6 className='ft-10 text-slate-500 mt-1'> Branch </h6>
                <p className='text-sm text-slate-900 font-bold text-[#1c273c]'> {loadingF ? 'Loading...' : branch ? branch : 'Not Selected'} </p>
            </div>
            <div className='px-5 mr-9'>
                <h6 className='ft-10 text-slate-500 mt-1'> ATM </h6>
                <p className='text-sm text-slate-900 font-bold text-[#1c273c]'> {loadingF ? 'Loading...' : atm ? atm : 'Not Selected'} </p>
            </div>
        </Fragment>
    );
}

export default ForecastsHead