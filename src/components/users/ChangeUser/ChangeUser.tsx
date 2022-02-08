import React from 'react';
import {Button, FormControl, FormGroup, MenuItem, Select, SelectChangeEvent, TextField} from "@material-ui/core";
import {updateCurrentUser, UsersType} from "../../../reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import style from "../../common/styles/FormStyles.module.scss";
import {useFormik} from "formik";
import {Link, useParams} from "react-router-dom";
import {CityType} from "../../../api/appAPI";

type FormikErrorType = {
    fio?: string
    cityId?: string
}

export const ChangeUser = () => {
    const {id} = useParams()
    const cities = useSelector<AppRootStateType, CityType[]>(m => m.cities)
    const users = useSelector<AppRootStateType, UsersType[]>(m => m.users.usersList)
    const dispatch = useDispatch()

    const idPath = id
    const user = users.filter(f => f.id === idPath)[0]
    const idCity = cities.filter(f => f.id === user.cityId)[0].id

    const changeCitySelect = (event: SelectChangeEvent<string>) => {
        formik.values.cityId = event.target.value
    }
    const formik = useFormik({
        initialValues: {
            id: user.id,
            fio: user.fio,
            cityId: idCity,
        },
        validate: (values: { fio: string; cityId: string }) => {
            const errors: FormikErrorType = {};
            if (!values.fio) {
                errors.fio = 'Required field';
            }
            return errors
        },

        onSubmit: (values: { id: string , fio: string, cityId: string }) => {
            dispatch(updateCurrentUser({id: values.id, fio: values.fio, cityId: values.cityId}))
        }
    })

    return (
        <div className={style.container}>
            <h1>Изменение пользователя</h1>
            <FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <div className={style.wrapperForm}>
                            <div className={style.block}>
                                <h2>Ф.И.О :</h2>
                                <TextField
                                    style={{width: "300px"}}
                                    color={"success"}
                                    margin="normal"
                                    error={formik.touched.fio && Boolean(formik.errors.fio)}
                                    {...formik.getFieldProps('fio')}
                                />
                            </div>
                            <div className={style.block}>
                                <h2>Город :</h2>
                                <FormControl style={{width: "300px"}} variant={"outlined"}>
                                    <Select
                                        defaultValue={idCity}
                                        onChange={changeCitySelect}
                                    >
                                        {cities.map(m => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "400px"}}>
                                <Button color={"success"} variant={"contained"} type={'submit'}>Изменить</Button>
                                <Link to={'/users-list'}><Button color={"error"}>Отмена</Button></Link>
                            </div>
                        </div>
                    </FormGroup>
                </form>
            </FormControl>
        </div>
    );
}

