import React, { useEffect } from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import useForm from '../hooks/useForm'
import { useState } from "react";
import { useNavigate } from 'react-router'
import { Grid } from '@mui/material'
import { Cookies, useCookies } from 'react-cookie';
import axios from 'axios'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

export default function ChangeUserData() {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user_id', 'access_token', 'role']);
    const getFreshModel = () => ({
        fio: '',
        date: '',
        city: '',
        eas: "",
        user_id: cookies['user_id'],
        access_token: cookies['access_token'],
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

    const order = e => {
        e.preventDefault();
        if (1)
            axios.post("http://localhost:8000/user_data/", values)
                .then(res => {
                    navigate('/profile')
                })
                .catch(err => {
                    console.log(err);
                    navigate('/profile')
                });
    }

    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (

        <Center2>
            <Card sx={{ borderRadius: "60px" }}>

                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ my: 3 }}>
                        Изменить данные
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={order}>
                            <TextField
                                label="Фамилия Имя Отчество"
                                name="fio"
                                value={values.fio}
                                onChange={handleInputChange}
                                variant="outlined"
                            />

                            <TextField
                                label="Город"
                                name="city"
                                value={values.city}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                            <TextField
                                label="Дата"
                                name="date"
                                value={values.date}
                                onChange={handleInputChange}
                                variant="outlined"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>Изменить</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center2>
    );
}