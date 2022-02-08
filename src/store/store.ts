import {applyMiddleware, combineReducers, createStore} from "redux";
import {ActionAuthReducerType, authReducer} from "../reducers/authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {UsersActionReducerType, usersReducer} from "../reducers/usersReducer";
import {citiesReducer} from "../reducers/citiesReducer";

let rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    cities: citiesReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type RootAppActionType = ActionAuthReducerType|UsersActionReducerType ;
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, RootAppActionType>

// @ts-ignore
window.store = store;