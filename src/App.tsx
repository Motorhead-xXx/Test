import React, {useEffect} from 'react';
import './App.css';
import {Login} from "./components/login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {Users} from "./components/users/Users";
import {v1} from "uuid";
import {fetchUsers, setUsersList} from "./reducers/usersReducer";
import {useDispatch} from "react-redux";
import {fetchCities, setCitiesList} from "./reducers/citiesReducer";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        let krasnodar = v1()
        let rostov = v1()
        dispatch(setUsersList([{id: v1(), fio: "Иван Иванович Иванов", cityId: krasnodar},
            {id: v1(), fio: "Андрей Андреевич Андреев", cityId: rostov}]))
        dispatch(setCitiesList([{id: krasnodar, name: "Краснодар"}, {id: rostov, name: "Ростов на Дону"}]))

        fetchUsers(1, 10)
        dispatch(fetchCities())
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Users/>}/>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"users-list/*"} element={<Users/>}/>
                <Route path="/404" element={<h1 className="pageNotFound"> 404: PAGE NOT FOUND </h1>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>
        </div>
    );
}

export default App;
