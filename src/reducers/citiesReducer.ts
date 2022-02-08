import {citiesAPI, CityType} from "../api/appAPI";
import {Dispatch} from "redux";

const initialState = {
    citiesList: [],
}
type initialStateType = typeof initialState


export const citiesReducer = (state:initialStateType = initialState, action: UsersActionReducerType) => {
    switch (action.type) {
        case 'users/SET_CITIES': {
            return [...state.citiesList, ...action.data]
        }
        default:
            return state;
    }
}
export type UsersActionReducerType = SetCitiesListType


type SetCitiesListType = ReturnType<typeof setCitiesList>
export const setCitiesList = (data:CityType[]) => ({
    type: 'users/SET_CITIES',
    data,
} as const)

export const fetchCities = () => async (dispatch: Dispatch) => {
    try {
        let response = await citiesAPI.getCityList()
        dispatch(setCitiesList(response))
    } catch (e) {
        console.error("Ошибка в запросе, данные не получены")
    }
}
