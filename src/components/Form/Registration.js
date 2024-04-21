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


const getFreshModel = () => ({
    name: '',
    email: '',
    telephone: '',
    date_of_birth: '',
    password: '',
})

function Center(props) {
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

export default function Registration() {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const navigate = useNavigate()

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
        temp.password = values.password != "" ? "" : "Это обязательное поле"
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    const registration = e => {
        e.preventDefault();
        if (validate())
            axios.post("http://localhost:8000/registration/", values)
                .then(res => {
                    setCookie('access_token', res.data.access_token, { path: '/' });
                    setCookie('user_id', res.data.user_id, { path: '/' });
                    setCookie('user', 1, { path: '/' });
                    setCookie('role', 'user', { path: '/' });
                    if (res.data.error) {
                        setCookie('user', 0, { path: '/' });
                    }
                    else {
                        navigate('/')
                    }
                })
                .catch(err => {
                    console.log(err);
                    //navigate('/')
                });
    }

    return (
        <Center>
            <Card sx={{ borderRadius: "60px", width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Регистрация
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={registration}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.name && { error: true, helperText: errors.name })} />
                            <TextField
                                label="Номер телефона"
                                name="telephone"
                                value={values.telephone}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.telephone && { error: true, helperText: errors.telephone })} />
                            <TextField
                                label="Дата рождения"
                                name="date_of_birth"
                                value={values.date_of_birth}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.date_of_birth && { error: true, helperText: errors.date_of_birth })} />

                            <TextField
                                label="Ваша почта"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="Пароль"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
                        </form>
                    </Box>
                    <Button onClick={() => { navigate("/login") }}>Вход</Button>
                </CardContent>
            </Card>
        </Center>
    );
}


