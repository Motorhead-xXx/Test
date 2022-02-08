import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import style from './ModalDelte.module.scss'
import {AppRootStateType} from "../../../../store/store";
import {deleteCurrentUsers} from "../../../../reducers/usersReducer";
import {CityType} from "../../../../api/appAPI";

interface propsType {
    fio: string
    userId: string
    cityId: string
}

export function ModalDelete(props: propsType) {
    const dispatch = useDispatch()
    const cityArr = useSelector<AppRootStateType, CityType[]>(m => m.cities)
    const [open, setOpen] = React.useState(false);
    const handleOpenDelete = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const clickDeleteUser = () => {
        dispatch(deleteCurrentUsers(props.userId))
        setOpen(false)
    }

    const cityName = cityArr.filter(f => f.id === props.cityId)[0].name

    return (
        <div>
            <IconButton color={"error"} onClick={handleOpenDelete}>
                <Delete fontSize={"large"}/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box  className={style.container}>
                    <Typography variant="h5" component="h2" className={style.textModal}>
                        <span>Удалить пользователя?</span>
                        <p>{`Имя: ${props.fio}`}</p>
                        <p>{`Город: ${cityName}`}</p>
                    </Typography>
                    <Typography sx={{mt: 3, width: "100%"}} className={style.buttonGroup}>
                        <Button variant={"contained"} color={"success"} size='small' onClick={clickDeleteUser}>Удалить</Button>
                        <Button variant={"contained"} color={"inherit"} size='small' onClick={handleClose}>Отмена</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}