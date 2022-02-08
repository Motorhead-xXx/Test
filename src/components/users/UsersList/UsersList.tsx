import React, {useState} from 'react';
import {Button, IconButton} from "@material-ui/core";
import style from './UsersList.module.scss';
import {ArrowLeft, ArrowRight, Sort} from "@material-ui/icons";
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {fetchUsers, UsersType} from "../../../reducers/usersReducer";
import {ModalDelete} from "./Modal/ModalDelete";
import {CityType} from "../../../api/appAPI";


interface UsersListPropsType {
    setToggle: () => void
}

export const UsersList = (props: UsersListPropsType) => {
    const dispatch = useDispatch()
    const users = useSelector<AppRootStateType, UsersType[]>(s => s.users.usersList)
    const cities = useSelector<AppRootStateType, CityType[]>(s => s.cities)
    const navigation = useNavigate()

    //Пагинация на  UI
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const usersSlice = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    ////////////

    const [sortFIO,setSortFIO] = useState<boolean>(false)
    const [sortCity,setSortCity] = useState<boolean>(false)

    const clickNextList = () => {
        setPage(page + 1)
    }
    const clickBackList = () => {
        setPage(page - 1)
    }

    const sortRowFIO = () => {
        setSortFIO(!sortFIO)
        if(sortFIO){
            dispatch(fetchUsers(1,rowsPerPage,1))
        }
        if(!sortFIO){
            dispatch(fetchUsers(1,rowsPerPage,0))
        }
    }
    const sortRowCity = () => {
        setSortCity(!sortCity)
        if(sortCity){
            dispatch(fetchUsers(1,rowsPerPage,1))
        }
        if(!sortCity){
            dispatch(fetchUsers(1,rowsPerPage,0))
        }
    }

    return (
        <div>
            <div>
                <NavLink to={"add-user"}>
                    <Button onClick={props.setToggle} variant={"contained"} color={'success'}>Добавить пользователя</Button>
                </NavLink>
                <div className={style.container}>
                    <div className={style.sortList}>
                        <div className={style.title}>
                            <span>Ф.И.О.</span>
                            <IconButton onClick={sortRowFIO} disabled={sortCity}>
                                <Sort fontSize={"large"}/>
                            </IconButton>
                        </div>
                        <div className={style.title}>
                            <span>Город</span>
                            <IconButton onClick={sortRowCity} disabled={sortFIO}>
                                <Sort fontSize={"large"}/>
                            </IconButton>
                        </div>
                    </div>
                    {usersSlice.map(m =>
                        <div key={m.id}>
                            <div className={style.list}>
                                <div className={style.nameCityClass} onClick={() => navigation(`change-user/${m.id}`)}>
                                    <div>{m.fio}</div>
                                    <div>{cities.filter(f => f.id === m.cityId).map(m => m.name)}</div>
                                </div>
                                <div className={style.deleteRow}>
                                    <ModalDelete cityId={m.cityId} fio={m.fio} userId={m.id}/>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <IconButton onClick={clickBackList} disabled={!page}><ArrowLeft fontSize={"large"}/></IconButton>
                        <IconButton onClick={clickNextList} disabled={usersSlice.length < rowsPerPage}><ArrowRight fontSize={"large"}/></IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

