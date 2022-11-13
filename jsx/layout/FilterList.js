import { Fragment, useEffect, useState } from 'react'
import Select from 'react-select';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';



const includes = (arr, id, key = 'atmId') => {
    return arr.find((elm) => elm[key] === id);
};

const styles = {
    control: (base, state) => ({
        ...base,
        border: state.isFocused ? '1px solid #533292 !important' : '',
        boxShadow: state.isFocused ? 'rgba(0, 0, 0, 0.16) 0px 1px 4px, #533292 0px 0px 0px 1px; !important' : '',
    })
};





const FilterList = ({ atms, cities, branches, types, city, setCity, branch, setBranch, type, setType, atm, setAtm, }) => {


    const [currentBranches, setCurrentBranches] = useState(branches);
    const [currentTypes, setCurrentTypes] = useState(types);
    const [currentAtms, setCurrentAtms] = useState(types);




    useEffect(() => {


        setCurrentBranches([{ city: '', value: '', label: 'None' }, ...branches.filter(elm => city === elm.city)]);
        setCurrentTypes([{ city: '', branchL: '', value: '', label: 'None' }, ...types.filter(elm => city === elm.city && branch === elm.branch)]);


        setCurrentAtms([{ city: '', branchL: '', type: '', value: '', label: 'None' },
        ...atms.filter(elm =>
            (city === '' && branch === '' && type === '') ||
            (city === elm.municipality && branch === '' && type === '') ||
            (city === elm.municipality && branch === elm.responsibleBranch && type === '') ||
            (city === elm.municipality && branch === elm.responsibleBranch && type === elm.LocationType)
        )
        ]);


    }, [city, branch, type, atm]);



    return (
        <Fragment>

            <li>
                <h1 className='text-slate-900 font-bold text-[#1c273c] mb-4'>
                    Select City
                </h1>


                <Select
                    styles={styles}
                    aria-labelledby="aria-label"
                    value={{ values: city, label: city ? city : 'None' }}
                    onChange={e => { setCity(e.value); setBranch(''); setType(''); setAtm(''); }}
                    inputId="aria-example-input"
                    name="aria-live-color"
                    options={cities}
                    menuPlacement="auto"
                />

            </li>

            <li>
                <h1 className='text-slate-900 font-bold text-[#1c273c] mb-4 mt-6'>
                    Select Branch
                </h1>


                <Select
                    styles={styles}
                    aria-labelledby="aria-label"
                    value={{ values: branch, label: branch ? branch : 'None' }}
                    onChange={e => { setBranch(e.value); setType(''); setAtm(''); }}
                    inputId="aria-example-input"
                    name="aria-live-color"
                    options={currentBranches}
                    menuPlacement="auto"
                />

            </li>

            <li>
                <h1 className='text-slate-900 font-bold text-[#1c273c] mb-4 mt-6'>
                    Select Type
                </h1>


                <Select
                    styles={styles}
                    aria-labelledby="aria-label"
                    value={{ values: type, label: type ? type : 'None' }}
                    onChange={e => { setType(e.value); setAtm(''); }}
                    inputId="aria-example-input"
                    name="aria-live-color"
                    options={currentTypes}
                    menuPlacement="auto"
                />

            </li>

            <li>
                <h1 className='text-slate-900 font-bold text-[#1c273c] mb-4 mt-6'>
                    Select ATM
                </h1>


                <Select
                    styles={styles}
                    aria-labelledby="aria-label"
                    value={{ values: atm, label: atm ? includes(atms, atm).atmName : 'None' }}
                    onChange={e => {
                        setAtm(e.value);
                        setCity(includes(atms, e.value)?.municipality ? includes(atms, e.value)?.municipality : '');
                        setBranch(includes(atms, e.value)?.responsibleBranch ? includes(atms, e.value)?.responsibleBranch : '');
                        setType(includes(atms, e.value)?.LocationType ? includes(atms, e.value)?.LocationType : '');
                    }}
                    inputId="aria-example-input"
                    name="aria-live-color"
                    options={currentAtms}
                    menuPlacement="top"
                />

            </li>

            {/* <li>
                <h1 className='text-slate-900 font-bold text-[#1c273c] mb-1 mt-4'>
                    Select Branch
                </h1>


                <FormControl sx={{ m: 1, minWidth: 120 }} className='w-98' size="small">
                    <InputLabel id="demo-simple-select-helper-label">Branch</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={branch}
                        label="Branch"
                        onChange={e => { setBranch(e.target.value); setType(''); setAtm(''); }}
                        size="small"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {
                            branches.map(elm => (
                                city === elm.city ?
                                    <MenuItem value={elm.branch}>
                                        <em> {elm.branch} </em>
                                    </MenuItem> :
                                    <div></div>
                            ))
                        }
                    </Select>
                </FormControl>
            </li> */}

            {/* <li>
                <h1 className='text-slate-900 font-bold text-[#1c273c] mb-1 mt-4'>
                    Select Type
                </h1>


                <FormControl sx={{ m: 1, minWidth: 120 }} className='w-98' size="small">
                    <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={type}
                        label="Type"
                        onChange={e => { setType(e.target.value); setAtm(''); }}
                        size="small"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {
                            types.map(elm => (
                                city === elm.city && branch === elm.branch ?
                                    <MenuItem value={elm.type}>
                                        <em> {elm.type} </em>
                                    </MenuItem> :
                                    <div></div>
                            ))
                        }
                    </Select>
                </FormControl>
            </li> */}

            {/* <li>
                <h1 className='text-slate-900 font-bold text-[#1c273c] mb-1 mt-4'>
                    Select ATM
                </h1>


                <FormControl sx={{ m: 1, minWidth: 120 }} className='w-98' size="small">
                    <InputLabel id="demo-simple-select-helper-label">ATM</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={atm}
                        label="ATM"
                        onChange={e => { setAtm(e.target.value); setCity(includes(atms, e.target.value).municipality); setBranch(includes(atms, e.target.value).responsibleBranch); setType(includes(atms, e.target.value).LocationType); }}
                    >

                        {
                            atms.map((elm, i) => (
                                (city === '' && branch === '' && type === '') ||
                                    (city === elm.municipality && branch === '' && type === '') ||
                                    (city === elm.municipality && branch === elm.responsibleBranch && type === '') ||
                                    (city === elm.municipality && branch === elm.responsibleBranch && type === elm.LocationType)
                                    ?
                                    <MenuItem value={elm.atmId} key={elm.atmId}>
                                        <em> {elm.atmName} </em>
                                    </MenuItem> : <div> </div>
                            ))
                        }

                    </Select>
                </FormControl>
            </li> */}
        </Fragment>
    )

}

export default FilterList