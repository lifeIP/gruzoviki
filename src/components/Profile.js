import React, { useEffect } from 'react'

import CardMedia from '@mui/material/CardMedia';

import axios from 'axios'
import useForm from './hooks/useForm';
import CardActions from '@mui/material/CardActions';
import { Box, Grid, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router'

import { Button, Card, CardContent, TextField, Typography } from '@mui/material'

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





export default function Profile() {
    const [cookies, setCookie, removeCookie] = useCookies(['login', 'user_id', 'access_token']);
    const getFreshModel = () => ({
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

    const navigate = useNavigate()

    const [orderData, setOrderData] = useState([]);
    const [userData, setUserData] = useState({
        fio: "Иван Иванович Иванов",
        city: "Москва",
        date_of_bith: "06.08.2025"
    });



    useEffect(() => {

        axios.post("http://localhost:8000/user/", values)
            .then(res => {
                console.log(res.data);
                if (res.data.error) {
                    setUserData({
                        fio: "Иван Иванович Иванов",
                        city: "Москва",
                        date_of_bith: "06.08.2025"
                    })
                }
                else {
                    console.log();
                    if (res.data == undefined) {
                        setUserData({
                            fio: "Иван Иванович Иванов",
                            city: "Москва",
                            date_of_bith: "06.08.2025"
                        })
                    }
                    setUserData({
                        fio: res.data.fio,
                        city: res.data.city,
                        date_of_bith: res.data.date_of_bith,
                    })
                }
                //navigate('/')
            });
        axios.post("http://localhost:8000/order/get/", values)
            .then(res => {
                console.log(res.data);
                if (res.data.error) {

                }
                else {
                    console.log();
                    if (res.data == undefined) {

                    }

                    else {
                        let i = 0;
                        do {
                            setOrderData(() => [...orderData, { id: res.data.content[0][0], name: res.data.content[0][3], point_a: res.data.content[0][5], point_b: res.data.content[0][6] }]);
                            i = i + 1;
                        } while(i < res.data.content.length);
                    }
                }
                //navigate('/')
            })
    }, []);







    function loadOrderData() {

    }
    return (
        <Center>
            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }}>
                Профиль
            </Typography>
            <Card sx={{ width: "45vw", height: "35vh", display: 'flex', borderRadius: "60px", alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                    sx={{ marginLeft: "1.5vw", maxWidth: "30vh", maxHeight: "30vh", }}
                    component="img"
                    alt="user"
                    image="https://www.clipartmax.com/png/full/267-2671061_yükle-youssefdibeyoussefdibe-profile-picture-user-male.png"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {userData.fio}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userData.city}, {userData.date_of_bith}
                    </Typography>
                </CardContent>
                <CardActions sx={{ marginRight: "1.5vw" }}>
                    <IconButton size="small" onClick={() => { navigate("/userdata") }}><EditIcon /></IconButton>
                    <Popup trigger=
                        {
                            <IconButton size="small"><DeleteIcon /></IconButton>
                        }
                        modal nested>
                        {
                            close => (
                                <Box sx={{ backgroundColor: "#18181899", width: "100vw", height: "100svh" }}>
                                    <Center2>
                                        <Card>
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }}>
                                                    Вы уверены, что хотите удалить аккаунт?
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Button onClick={
                                                    () => {
                                                        setCookie('user', 0, { path: '/' });
                                                        navigate('/');
                                                        close();
                                                    }}>Да</Button>
                                                <Button sx={{ marginLeft: "3vw" }} onClick={
                                                    () => {
                                                        close();
                                                    }}>Нет</Button>
                                            </CardActions>
                                        </Card>
                                    </Center2>
                                </Box>
                            )
                        }
                    </Popup>
                </CardActions>
            </Card>
            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }}>
                История поездок
            </Typography>
            {orderData.map((data) => (
                <Card sx={{ width: "45vw", height: "15vh", display: 'flex', borderRadius: "60px", marginBottom: "1.5vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "25hw" }}>
                        <Typography variant="body2" color="text.secondary">Номер заказа: {data.id}</Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "25hw" }}>
                        <Typography variant="body2" color="text.secondary">Товар: {data.name}</Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "25hw" }}>
                        <Typography variant="body2" color="text.secondary">
                            Точка отправления: {data.point_a}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "25hw" }}>
                        <Typography variant="body2" color="text.secondary">
                            Точка прибытия: {data.point_b}
                        </Typography>
                    </CardContent>

                    <CardContent sx={{ marginLeft: '1.5vw', width: "25hw" }}>
                        <Typography variant="body2" color="text.secondary">
                            {data.cost}
                        </Typography>
                    </CardContent>
                    {/* <CardContent>
                        <IconButton><EditIcon /></IconButton>
                        <IconButton><DeleteIcon /></IconButton>
                    </CardContent> */}
                </Card>
            ))}
            {/* <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
            <Button onClick={() => { loadOrderData(); }}>Обновить</Button>
        </Box> */}
        </Center>
    )
}
