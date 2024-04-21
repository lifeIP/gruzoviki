import React, { useEffect } from 'react'

import CardMedia from '@mui/material/CardMedia';

import axios from 'axios'
import useForm from '../hooks/useForm';
import CardActions from '@mui/material/CardActions';
import { Box, Grid, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router'


import ButtonGroup from '@mui/material/ButtonGroup';

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

export default function Profile_Manager() {
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
        fio: "",
        city: "",
        date_of_bith: ""
    });



    useEffect(() => {

        axios.post("http://localhost:8000/user/", values)
            .then(res => {
                console.log(res.data);
                if (res.data.error) {
                    setUserData({
                        fio: "",
                        city: "",
                        date_of_bith: ""
                    })
                }
                else {
                    console.log();
                    if (res.data == undefined) {
                        setUserData({
                            fio: "",
                            city: "",
                            date_of_bith: ""
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
                        // console.log(res.data.content.length);
                        var data = [];
                        var i = 0;
                        while(i < res.data.len){
                            console.log(i);
                            console.log(res.data[i]);
                            data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6] });
                            i += 1;
                            setOrderData(data);
                        }
                    }
                }
                //navigate('/')
            })
    }, []);

    return (
        <Center>
            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }} fontWeight={600}>
                ПРОФИЛЬ
            </Typography>
            <Card sx={{ width: "65vw", height: "35vh", display: 'flex', borderRadius: "35px", alignItems: 'center', justifyContent: 'center' }}>
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
            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }} fontWeight={600}>
                История поездок
            </Typography>
            <Box variant="text" aria-label="Basic button group" sx={{ alignItems: 'center', display: "flex", justifyContent: "center", marginBottom: "2vh"}}>
                <Button sx={{marginRight:"3vw"}}>Все заказы</Button>
                <Button sx={{marginRight:"3vw"}}>В обработке</Button>
                <Button sx={{marginRight:"3vw"}}>Текущие</Button>
                <Button >Завершенные</Button>
            </Box>
            {
            orderData.map((data) => (
                <Card sx={{ width: "65vw", height: "15vh", display: 'flex', borderRadius: "35px", marginBottom: "1.5vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <CardContent>
                        <IconButton><EditIcon /></IconButton>
                        <IconButton><DeleteIcon /></IconButton>
                    </CardContent>
                </Card>
            ))}
            {/* <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
            <Button onClick={() => { loadOrderData(); }}>Обновить</Button>
        </Box> */}
        </Center>
    )
}