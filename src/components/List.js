import React from 'react';
import OneHoliday from "./OneHoliday";
import {useSelector} from "react-redux";

const List = ({message, countries, country, nothingFound}) => {
    const countryName = countries.filter(item => item.code === country).length ?
        countries.filter(item => item.code === country)[0].countryName : ''
    const holidays = useSelector(state => state.holidays)
    return holidays.length
        ?
        <div><h3 className='moreSpace'>Here's what we have found for {`${holidays[0].date.iso} in ${countryName}`}:</h3>
            <OneHoliday holidays={holidays}/>{nothingFound}{message}</div>
        : <div><h5 className='moreSpace'>{nothingFound}{message}</h5></div>
        ;
};

export default List;