import {authAPI, LoginApiType} from "../api/appAPI";
import {Dispatch} from "redux";
import {AppThunkType} from "../store/store";
import {v1} from "uuid";

const initialState = {
    id: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state:AuthInitialStateType = initialState, action: ActionAuthReducerType) => {
    switch (action.type) {
        case 'auth/SET_USER_DATA': {
            return {...state, ...action.data}
        }
        default:
            return state;
    }
}
export type ActionAuthReducerType = SetUserDataType
type SetUserDataType = ReturnType<typeof setUsersData>

export const setUsersData = (id: string | null, login: string | null, isAuth: boolean) => ({
    type: 'auth/SET_USER_DATA',
    data: {id, login, isAuth}
} as const)

export const authUserLogin = () => async (dispatch: Dispatch) => {
    try {
        let response = await authAPI.me()
        const {id, login} = response.data;
        dispatch(setUsersData(id, login, true))
    } catch (e) {
        console.error("Ошибка в запросе, данные не получены")
    }
}

export const login = (data: LoginApiType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setUsersData(v1(),data.login, true))
        await authAPI.login(data);
        dispatch(authUserLogin())
    } catch (e) {
        console.error("Ошибка в запросе, данные не получены")
    }
}

export const logOut = () => async (dispatch: Dispatch) => {
  try{
      //пока не отработает запрос, я не могу диспатчить action, а он в любом случае выдаст ошибку так как у нас имитация запроса,
      // по-этому диспатчу сразу
      dispatch(setUsersData(null, null,false))
      await authAPI.logOut()
    }catch(e){
      console.error("Ошибка logOut")
  }
}

type AuthInitialStateType = {
    id: null|string
    login: null|string
    isAuth: boolean
}