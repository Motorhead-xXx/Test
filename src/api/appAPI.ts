import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://test/api/',
});


export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: string, login: string }>>('auth/me').then(res => res.data)
    },
    login(params: LoginApiType) {
        return instance.post<LoginApiType, AxiosResponse<ResponseType<{ userId: number }>>>(`auth/login/`, params)
    },
    logOut() {
        return instance.delete<ResponseType>(`/auth/login/`)
    },
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number, sort?: number) {
        return instance.get<usersType[]>(`users?page=${currentPage}&count=${pageSize}&sortFIO=${sort}&sortCityName=${sort}`)
            .then(res => res.data);
    },
    createUser(data: usersType) {
        return instance.post<AxiosResponse<usersType[]>>('users', {data});
    },
    deleteUser(id: string) {
        return instance.delete<usersType[]>(`users/${id}`);
    },
    updateUser(id: string, fio: string, cityId: string) {
        return instance.put<AxiosResponse<usersType[]>>(`users/${id}`, {fio, cityId});
    }
}

export const citiesAPI = {
    getCityList() {
        return instance.get<CityType[]>(`cities`)
            .then(res => res.data);
    },
}

type ResponseType<T = {}> = {
    data: T
}

export type LoginApiType = {
    login: string
    password: string
}

export type usersType = {
    id: string
    fio: string
    cityId: string
}

export type CityType = {
    id: string
    name: string
}