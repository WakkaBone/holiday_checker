export const NOTHING_FOUND = 'NOTHING_FOUND'
export const GET_INFO = 'GET_INFO'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const CLEAR_LIST = 'CLEAR_LIST'
export const ADD_LAST_FOUND = 'ADD_LAST_FOUND'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_TODAY_HOLIDAYS_ACTION = 'GET_TODAY_HOLIDAYS_ACTION'
export const GET_COMING_HOLIDAYS_ACTION = 'GET_COMING_HOLIDAYS_ACTION'
export const SET_COUNTRY_ACTION = 'SET_COUNTRY_ACTION'

const api_key = process.env.REACT_APP_API_KEY
const base_url = 'https://calendarific.com/api/v2'
const holiday_endpoint = '/holidays'
const country_endpoint = '/countries'

export const getTodayHolidayAction = (holidays) => ({type: GET_TODAY_HOLIDAYS_ACTION, payload: holidays})
export const getComingHolidayAction = (holidays) => ({type: GET_COMING_HOLIDAYS_ACTION, payload: holidays})
export const setCountryAction = (country) => ({type: SET_COUNTRY_ACTION, payload: country})
export const addLastFoundAction = (holidays) => ({type: ADD_LAST_FOUND, payload: holidays})
export const getInfoAction = (holidays) => ({type: GET_INFO, payload: holidays})
export const getCountriesAction = (countries) => ({type: GET_COUNTRIES, payload: countries})
export const nothingFound = () => ({type: NOTHING_FOUND})
export const clearMessage = () => ({type: CLEAR_MESSAGE})
export const clearList = () => ({type: CLEAR_LIST})

export const fetchHolidays = (country, year, month, day) => {
    return dispatch => {
        fetch(`${base_url}${holiday_endpoint}?&api_key=${api_key}&country=${country}&year=${year}&month=${month}&day=${day}`)
            .then(response => response.json())
            .then(data => {
                if(!data.response.holidays.length) dispatch(nothingFound())
                else {
                    dispatch(getInfoAction(data.response.holidays))
                    dispatch(addLastFoundAction(data.response.holidays))
                }
            });
    }
}

export const fetchTodayHolidays = (year, month, day) => {
    return dispatch => {
        fetch(`${base_url}${holiday_endpoint}?&api_key=${api_key}&country='us'&year=${year}&month=${month}&day=${day}`)
            .then(response => response.json())
            .then(data => {
                console.log('todayHols', data)
                dispatch(getTodayHolidayAction(data.response.holidays))
            });
    }
}

export const fetchComingHolidays = (country, year, month) => {
    return dispatch => {
        fetch(`${base_url}${holiday_endpoint}?&api_key=${api_key}&country=${country}&year=${year}&month=${month}`)
            .then(response => response.json())
            .then(data => {
                console.log('Coming hols', data)
                dispatch(getComingHolidayAction(data.response.holidays))
            });
    }
}

export const fetchCountries = () => {
    return dispatch => {
        fetch(`${base_url}${country_endpoint}?&api_key=${api_key}`)
            .then(response => response.json())
            .then(data => {
                data.response.countries ? dispatch(getCountriesAction(data.response.countries.map(item => ({
                    countryName: item.country_name,
                    code: item['iso-3166']
                })))) : console.log('ERROR')
            });
    }
}