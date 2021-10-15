import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchComingHolidays} from "../actions/holidayActions";

const Coming = ({country, countries}) => {
    const dispatch = useDispatch()
    const comingHolidays = useSelector(state => state.comingHolidays)
    const [filtered, setFiltered] = useState(comingHolidays.filter(item => item.date.datetime.day > new Date().getDate()))
    const [nextMonth, setNextMonth] = useState(false)

    const countryName = countries.filter(item => item.code === country).length ? countries.filter(item => item.code === country)[0].countryName : ''

    useEffect(() => {
        setFiltered(value => {
            let temp = comingHolidays.filter(item => Date.parse(item.date.iso) > new Date().getTime())
            temp.slice(5, temp.length)
            return temp
        })
    }, [comingHolidays, comingHolidays.length])

    const nextMonthHandler = () => {
        dispatch(fetchComingHolidays(country, new Date().getFullYear(), new Date().getMonth() + 2))
        setFiltered(value => {
            let temp = comingHolidays
            temp.slice(5, temp.length)
            return temp
        })
        setNextMonth(true)
    }
    return (
        <div className='comingBlock'>
            <h3>Coming up next in {countryName}:</h3>
            <ul>
                {filtered.length && nextMonth ?
                    filtered.map((item, index) => <li key={index}>{item.date.iso}: {item.name}</li>)
                    :
                    <span>There are no more holidays this month. <br/><span className='offer' onClick={nextMonthHandler}>Wanna take a look at the next month?</span></span>
                }
            </ul>
        </div>
    );
};

export default Coming;