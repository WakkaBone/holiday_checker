import './App.css';
import React, {useEffect, useState} from "react";
import Inputs from "./components/Inputs";
import List from "./components/List";
import History from "./components/History";
import {useDispatch, useSelector} from "react-redux";
import {fetchComingHolidays, fetchTodayHolidays} from "./actions/holidayActions";
import Header from "./components/Header";
import Today from "./components/Today";
import Coming from "./components/Coming";

function App() {
    const [message, setMessage] = useState('')
    const [details, setDetails] = useState(false)

    const holidays = useSelector(state => state.holidays)
    const lastFoundHolidays = useSelector(state => state.lastFoundHolidays)
    const currentCountry = useSelector(state => state.country)
    const countries = useSelector(state => state.countries)
    const nothingFound = useSelector(state => state.message)

    const dispatch = useDispatch()

    useEffect(() => {
        const today = new Date()
        dispatch(fetchTodayHolidays(today.getFullYear(), today.getMonth() + 1, today.getDate()))
        dispatch(fetchComingHolidays(currentCountry, today.getFullYear(), today.getMonth() + 1))
    },[])
    return (
        <div className='wrapper'>
            <Header/>
            <Inputs countries={countries} setMessage={setMessage} setDetails={setDetails}/>
            <div className={`bodyLists`}>
                <div className={`${!holidays.length && !message && !nothingFound ? 'hidden list' : 'list'}`}><List
                    country={currentCountry} countries={countries} nothingFound={nothingFound}
                    message={message}/>
                </div>
                <div className={`${!lastFoundHolidays.length ? 'hidden history' : 'history'}`}><History/></div>
            </div>
            <div className={`bodyLists2 ${details ? '' : 'hidden'}`}>
                <Today country={currentCountry} countries={countries}/>
                <Coming country={currentCountry} countries={countries}/>
            </div>
        </div>
    );
}

export default App;