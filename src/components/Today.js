import React from 'react';
import {useSelector} from "react-redux";

const Today = ({country, countries}) => {
    const todayHolidays = useSelector(state => state.todayHolidays)
    const countryName = countries.filter(item => item.code === country).length ?
        countries.filter(item => item.code === country)[0].countryName : ''
    return (
        <div className='todayBlock'>
            <h3>Today's holidays in {countryName}: </h3>
            <ul>
                {todayHolidays.length ? todayHolidays.map(item =>
                    <li>{item.name}</li>) : 'There are no holidays today :('}
            </ul>
        </div>
    );
};

export default Today;