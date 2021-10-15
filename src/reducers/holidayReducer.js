import {
    ADD_LAST_FOUND,
    CLEAR_LIST,
    CLEAR_MESSAGE, GET_COMING_HOLIDAYS_ACTION,
    GET_COUNTRIES,
    GET_INFO, GET_TODAY_HOLIDAYS_ACTION,
    NOTHING_FOUND, SET_COUNTRY_ACTION
} from "../actions/holidayActions";

export const holidayReducer = (state, action) => {
    switch(action.type){
        case GET_INFO: return {...state, holidays: action.payload}
        case SET_COUNTRY_ACTION: return {...state, country: action.payload}
        case NOTHING_FOUND: return {...state, holidays: [], message: 'Nothing was found'}
        case CLEAR_MESSAGE: return {...state, message: ''}
        case CLEAR_LIST: return {...state, holidays: []}
        case ADD_LAST_FOUND: return {...state, lastFoundHolidays: state.lastFoundHolidays.concat(action.payload.map(item => `${item.name} (${item.country.name})`))}
        case GET_COUNTRIES: return {...state, countries: action.payload}
        case GET_TODAY_HOLIDAYS_ACTION: return {...state, todayHolidays: action.payload}
        case GET_COMING_HOLIDAYS_ACTION: return {...state, comingHolidays: action.payload}
        default: return state
    }
}