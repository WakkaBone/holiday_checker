import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {clearList, clearMessage, fetchCountries, fetchHolidays, setCountryAction} from "../actions/holidayActions";

const Inputs = ({setMessage, setDetails, countries}) => {
    const [country, setCountry] = useState('AF')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountries())
    }, [countries.length])

    return (
        <div className='inputContainer'>
            <input name='day' type='number' className='oneFifth' value={day} onChange={(e) => {
                dispatch(clearMessage())
                setMessage('')
                setDay(+e.target.value)
            }} placeholder='day'/>
            <input name='month' type='number' className='oneFifth' value={month} onChange={(e) => {
                setMessage('')
                setMonth(+e.target.value)
            }} placeholder='month'/>
            <input name='year' type='number' className='oneFifth' value={year} onChange={(e) => {
                setMessage('')
                setYear(+e.target.value)
            }} placeholder='year'/>
            <select name='country' className='oneFifth' onChange={(e) => setCountry(e.target.value)}>
                {countries.map((country, index) => {
                    return <option key={index} value={country.code}>{country.countryName}</option>
                })}
            </select>
            <button className='oneFifth searchButton' onClick={() => {
                if (typeof day !== "number" || day > 31 || !day) {
                    dispatch(clearMessage())
                    setMessage('Date is incorrect')
                    dispatch(clearList())
                    return
                }
                if (typeof month !== "number" || month > 12 || !month) {
                    dispatch(clearMessage())
                    setMessage('Month is incorrect')
                    dispatch(clearList())
                    return
                }
                if (typeof year !== "number" || !year || year < 1800) {
                    dispatch(clearMessage())
                    setMessage('Year is incorrect')
                    dispatch(clearList())
                    return
                } else
                    setDay('')
                setMonth('')
                setYear('')
                dispatch(setCountryAction(country))
                setDetails(true)
                dispatch(fetchHolidays(country, year, month, day))
            }}>Search
            </button>
        </div>
    );
};

export default Inputs;