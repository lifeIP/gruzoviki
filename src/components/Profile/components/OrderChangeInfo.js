import React, { useEffect } from 'react'

import CardMedia from '@mui/material/CardMedia';

import axios from 'axios'
import useForm from '../../hooks/useForm';

import CardActions from '@mui/material/CardActions';
import { Box, Grid, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router'

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

import ButtonGroup from '@mui/material/ButtonGroup';

import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import DataUsageIcon from '@mui/icons-material/DataUsage';


function Center(props) {
    return (
        <Grid container
            direction="row"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}>
            <Grid item>
                {props.children}
            </Grid>
        </Grid>
    )
}

function Center2(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}>
            <Grid item xs={1}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default function OrderChangeInfo({}) {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['m_id, order_status', 'role', 'login', 'user_id', 'access_token']);

    const getFreshModel = () => ({
        user_id: cookies['user_id'],
        access_token: cookies['access_token'],
        name: "",
        driver: undefined,
        point_a: "",
        point_b: "",
        m_id: cookies['m_id'],
    })
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    // const validate = () => {
    //     let temp = {}
    //     temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
    //     temp.password = values.password != "" ? "" : "Это обязательное поле"
    //     setErrors(temp)
    //     return Object.values(temp).every(x => x == "")
    // }

    const changeOrderData = e => {
        e.preventDefault();
        if (true)
            axios.post("http://localhost:8000/changeOrderData/", values)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                    //navigate('/')
                });
            navigate("/profile");
    }
  return (
    <Center>
            <Card sx={{ borderRadius: "60px", width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Изменить заказ
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={changeOrderData}>
                            <TextField
                                label="Товар"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.name && { error: true, helperText: errors.name })} />
                            <TextField
                                label="Точка отправления"
                                name="point_a"
                                value={values.point_a}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.point_a && { error: true, helperText: errors.point_a })} />
                            <TextField
                                label="Точка прибытия"
                                name="point_b"
                                value={values.point_b}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.point_b && { error: true, helperText: errors.point_b })} />

                            <TextField
                                label="Водитель"
                                name="driver"
                                value={values.driver}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.driver && { error: true, helperText: errors.driver })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>Сохранить</Button>
                        </form>
                    </Box>
                    <Button onClick={() => { navigate("/profile") }}>Отмена</Button>
                </CardContent>
            </Card>
        </Center>
  );
}
