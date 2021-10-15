import React from 'react';
import {useSelector} from "react-redux";

const History = (props) => {
    const lastFoundHolidays = useSelector(state => state.lastFoundHolidays)
    return (
        <div>
        <h3 className='moreSpace'>Last 5 searched holidays:</h3>
            <ol>
                {checkLength(lastFoundHolidays).length ? checkLength(lastFoundHolidays).map((item, index) => <li key={index}>{item}</li>) : ''}
            </ol>
        </div>
    );
};

function checkLength (array) {
    if(array.length >= 5) {
        const forDelete = array.length - 5
        array.splice(0, forDelete)
        return array
    } else return array
}

export default History;