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

export default function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['login', 'role']);
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

    const login = e => {
        e.preventDefault();
        if (validate()) {
            axios.post("http://localhost:8000/login/", values)
                .then(res => {
                    console.log(res);
                    setCookie('access_token', res.data.access_token, { path: '/' });
                    setCookie('user_id', res.data.user_id, { path: '/' });
                    setCookie('user', 1, { path: '/' });
                    setCookie('role', res.data.role, { path: '/' });
                    if (res.data.error) {
                        setCookie('user', 0, { path: '/' });
                    }
                    else {
                        navigate('/')
                    }
                })
                .catch(err => {
                    console.log(err);
                    navigate('/')
                })
        }
    }

    return (
        <Center>
            <Card sx={{ borderRadius: "60px", width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Войти
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="Password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ВОЙТИ</Button>
                        </form>
                    </Box>
                    <Button onClick={() => { navigate("/registration") }}>Регистрация</Button>
                </CardContent>
            </Card>
        </Center>
    );
}