import React, {useState} from 'react';
import style from './Users.module.scss'
import {Button} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import {AddUser} from "./AddUser/AddUser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {logOut} from "../../reducers/authReducer";
import {UsersList} from "./UsersList/UsersList";
import {ChangeUser} from "./ChangeUser/ChangeUser";


export const Users = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(s => s.auth.isAuth)
    const [toggle, setToggle] = useState(false)

    const addUsersToggle = () => {
        setToggle(true)
    }

    const logOutHandler = () => {
        dispatch(logOut())
    }

    if (!isAuth) {
        return <Navigate to={"/login"} replace/>
    }

    return (
        <div className={style.containerUsersList}>

            <div className={style.leftMenu} onClick={() => {
                setToggle(false)
            }}>
                <Link to={'/users-list'} className={style.leftMenuContainer}>
                    <Person style={{fontSize: "50px", color: "white"}}/>
                    <span style={{color: "white"}}>Пользователи</span>
                </Link>
            </div>

            <div className={style.container}>
                <div className={style.header}>

                    <div>{toggle ? <span style={{color: "#9b9a9a"}}>Пользователи</span> : null}</div>

                    <div className={style.headerInfo}>
                        <span className={style.Name}>Иван Иванович Иванов</span>
                        <Button onClick={logOutHandler} style={{height: "45px", marginLeft: "10px"}} variant={"contained"} color={"success"}>Выйти</Button>
                    </div>
                </div>
            </div>

            <div className={style.mainContent}>
                <Routes>
                    <Route path="/" element={<UsersList setToggle={addUsersToggle}/>}/>
                    <Route path="add-user" element={<AddUser/>}/>
                    <Route path="change-user/:id" element={<ChangeUser/>}/>
                </Routes>
            </div>
        </div>
    );
}

