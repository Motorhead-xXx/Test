import React from 'react';
import {Button, FormControl, FormGroup, MenuItem, Select, SelectChangeEvent, TextField} from "@material-ui/core";
import {createUser} from "../../../reducers/usersReducer";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import style from "../../common/styles/FormStyles.module.scss";
import {useFormik} from "formik";
import {Link} from "react-router-dom";
import {CityType} from "../../../api/appAPI";

interface FormikErrorType {
    fio?: string
    cityId?: string
}

export const AddUser = () => {
    const cityArr = useSelector<AppRootStateType, CityType[]>(m => m.cities)
    const dispatch = useDispatch()
    const changeCitySelect = (event: SelectChangeEvent<string>) => {
        formik.values.cityId = event.target.value
    }
    const formik = useFormik({
        initialValues: {
            fio: "",
            cityId: "",
        },
        validate: (values: { fio: string; cityId: string }) => {
            const errors: FormikErrorType = {};
            if (!values.fio) {
                errors.fio = 'Обязательное поле ФИО и Город';
            }
            if (!values.cityId) {
                errors.cityId = 'Обязательное поле ФИО и Город';
            }
            return errors
        },

        onSubmit: (values: { fio: string, cityId: string }) => {
            dispatch(createUser({id: v1(), fio: values.fio, cityId: values.cityId}))
        }
    })

    return (
        <div className={style.container}>
            <h1>Добавление пользователя</h1>
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
                                        error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                                        defaultValue={""}
                                        onChange={changeCitySelect}
                                    >
                                        {cityArr.map(m => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={style.buttonGroupForm}>
                                <Button color={"success"} variant={"contained"} type={'submit'}>Добавить</Button>
                                <Link to={'/users-list'}><Button color={"error"}>Отмена</Button></Link>
                            </div>
                            {formik.errors.fio && formik.errors.cityId ? <div style={{color: "red"}}>{formik.errors.fio || formik.errors.cityId}</div> : null}
                        </div>
                    </FormGroup>
                </form>
            </FormControl>
        </div>
    );
}

