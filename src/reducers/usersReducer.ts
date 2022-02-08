import {setUsersData} from "./authReducer";
import {authAPI, userAPI} from "../api/appAPI";
import {Dispatch} from "redux";

const initialState = {
    usersList: [],
}
type initialStateType = {
    usersList: UsersType[],
}

export const usersReducer = (state: initialStateType = initialState, action: UsersActionReducerType) => {
    switch (action.type) {
        case 'users/SET_USERS': {
            return {...state, usersList: action.users}
        }
        case 'users/ADD_USER': {
            return {...state, usersList: [...state.usersList, action.user]}
        }
        case 'users/CHANGE_USER': {
            return {
                ...state,
                usersList: [...state.usersList.map(m => (m.id === action.user.id) ? {...m, fio: action.user.fio, cityId: action.user.cityId} : m)]
            }
        }
        case 'users/DELETE_USER': {
            return {...state, usersList: [...state.usersList.filter(m => m.id !== action.id)]}
        }
        default:
            return state;
    }
}
export type UsersActionReducerType = SetUserListType | AddUserType | ChangeUserType | DeleteUserType

type SetUserListType = ReturnType<typeof setUsersList>
export const setUsersList = (users: UsersType[]) => ({
    type: 'users/SET_USERS',
    users,
} as const)

type AddUserType = ReturnType<typeof addUser>
export const addUser = (user: UsersType) => ({
    type: 'users/ADD_USER',
    user,
} as const)

type ChangeUserType = ReturnType<typeof changeUser>
export const changeUser = (user: UsersType) => ({
    type: 'users/CHANGE_USER',
    user,
} as const)

type DeleteUserType = ReturnType<typeof deleteUser>
export const deleteUser = (id: string) => ({
    type: 'users/DELETE_USER',
    id,
} as const)


export const fetchUsers = (currentPage: number, pageSize: number, sort?: number) => async (dispatch: Dispatch) => {
    try {
        let response = await userAPI.getUsers(currentPage,pageSize,sort)
        dispatch(setUsersList(response))
    } catch (e) {
        console.error("Ошибка в запросе, данные не получены")
    }
}
export const deleteCurrentUsers = (id:string) => async (dispatch: Dispatch) => {
    try {
        dispatch(deleteUser(id))
        await userAPI.deleteUser(id)
    } catch (e) {
        console.error("Ошибка в запросе, данные не получены")
    }
}
export const createUser = (data:UsersType) => async (dispatch: Dispatch) => {
    try {
        dispatch(addUser(data))
        await userAPI.createUser(data)
    } catch (e) {
        console.error("Ошибка в запросе, данные не получены")
    }
}
export const updateCurrentUser = (user:UsersType) => async (dispatch: Dispatch) => {
    try {
        dispatch(changeUser(user))
        await userAPI.updateUser(user.id,user.fio,user.cityId)
    } catch (e) {
        console.error("Ошибка в запросе, данные не получены")
    }
}

export type UsersType = {
    id: string
    fio: string
    cityId: string
}
