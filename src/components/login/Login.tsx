import {Button, FormControl, FormGroup, Paper, TextField} from '@material-ui/core';
import style from './Login.module.scss'
import {useFormik} from "formik";
import {login} from "../../reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import React from "react";
import {AppRootStateType} from "../../store/store";


type FormikErrorType = {
    login?: string
    password?: string
}
type FormikValueType = {
    login: string
    password: string
}

export const Login = () => {
    const isAuth = useSelector<AppRootStateType,boolean>(s=>s.auth.isAuth)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            login: 'ivan07',
            password: '12345',
        },
        validate: (values: { login: string; password: string }) => {
            const errors: FormikErrorType = {};
            if (!values.login) {
                errors.login = 'Required field';
            }
            if (!values.password) {
                errors.password = 'Required field'
            } else if (values.password.length < 3) {
                errors.password = "Invalid password ( < 3 symbols )"
            }
            return errors;
        },

        onSubmit: (values: FormikValueType) => {
            if (values.login === 'ivan07' && values.password === "12345") {
                //Имитируем запрос на сервер
                dispatch(login(values))
            } else {
                alert("Ошибка логина и пароля")
            }
        }
    })
    if (isAuth) {
        return <Navigate to="/users-list" replace/>
    }

    return (
        <div className={style.container}>
            <Paper className={style.paper}>
                <h1>Вход</h1>
                <FormControl>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup className={style.formGroup}>
                            <div className={style.textFieldContainer}>
                                <TextField
                                    className={style.textField}
                                    color={"success"}
                                    label="login"
                                    margin="normal"
                                    error={formik.touched.login && Boolean(formik.errors.login)}
                                    {...formik.getFieldProps('login')}
                                />
                                <div className={style.error}>
                                    {formik.errors.login ? <div style={{color: "red"}}>{formik.errors.login}</div> : null}
                                </div>

                                <TextField className={style.textField} color={"success"} type="password" label="Password"
                                           error={formik.touched.password && Boolean(formik.errors.password)}
                                           margin="normal"
                                           {...formik.getFieldProps('password')}
                                />
                                <div className={style.error}>
                                    {formik.touched.password && formik.errors.password ?
                                        <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                                </div>
                            </div>
                            <Button className={style.loginButton} type={'submit'} variant={'contained'} color={'success'}>
                                Войти
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Paper>
        </div>
    )
}