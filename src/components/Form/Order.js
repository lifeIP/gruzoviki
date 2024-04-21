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

export default function Order() {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user_id', 'access_token', 'role']);

    useEffect(()=>{
        if(cookies['user'] == 0){
            navigate("/login/");
        }
    },[])
    
    const getFreshModel = () => ({
        type: '',
        tonaz: '',
        a: '',
        b: '',
        type_of_machina: '',
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
            axios.post("http://localhost:8000/order/", values)
                .then(res => {

                    if (res.data.error) {
                        //
                    }
                    else {
                        navigate('/')
                    }
                    //navigate('/')
                })
                .catch(err => {
                    console.log(err);
                    //navigate('/')
                });
    }

    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        values.type_of_machina = event.target.value;
        setType(event.target.value);
    };

    return (
        <Center>
            <Card sx={{ borderRadius: "60px", width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Заказ
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={order}>
                            <TextField
                                label="Что перевозим?"
                                name="type"
                                value={values.type}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.type && { error: true, helperText: errors.type })} />
                            <TextField
                                label="Тоннаж"
                                name="tonaz"
                                value={values.tonaz}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.tonaz && { error: true, helperText: errors.tonaz })} />
                            <TextField
                                label="Точка отправления"
                                name="a"
                                value={values.a}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.a && { error: true, helperText: errors.a })} />

                            <TextField
                                label="Точка прибытия"
                                name="b"
                                value={values.b}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.b && { error: true, helperText: errors.b })} />

                            <FormControl fullWidth sx={{ m: 1, width: '90%' }}>
                                <InputLabel id="type_of_machina">Выберете тип фургона</InputLabel>
                                <Select
                                    labelId=""
                                    id="simple-select"
                                    value={type}
                                    label="type_of_mashina"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Изотермический</MenuItem>
                                    <MenuItem value={20}>Тентованный</MenuItem>
                                    <MenuItem value={30}>Рефрижератор</MenuItem>
                                    <MenuItem value={40}>С увеличенной грузоподъемностью</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ОФОРМИТЬ ЗАЯВКУ</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
}
