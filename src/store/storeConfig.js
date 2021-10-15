import {applyMiddleware, createStore} from "redux";
import {holidayReducer} from "../reducers/holidayReducer";
import thunk from "redux-thunk";

const initialState = {holidays: [], lastFoundHolidays: [], countries: [], todayHolidays: [], comingHolidays: [], country: 'us'}
export const store = createStore(holidayReducer, initialState, applyMiddleware(thunk))