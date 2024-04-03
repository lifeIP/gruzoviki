import React from 'react'

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

import data from './user_data.json';
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

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [orderData, setOrderData] = useState([]);
    const [userData, setUserData] = useState(data);

    function loadOrderData() {
        setOrderData(() => [...orderData, { id: -1, point_a: 'Томск', point_b: 'Москва', distance: 1555000, cost: 1555000 }])
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
                    <IconButton size="small" onClick={()=>{navigate("/userdata")}}><EditIcon /></IconButton>
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
                        ()=>{
                            setCookie('user', 0, { path: '/' });
                            navigate('/');
                            close();
                        }}>Да</Button>
                    <Button sx={{ marginLeft: "3vw" }} onClick={
                        ()=>{
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
                <Card sx={{ width: "45vw", height: "10vh", display: 'flex', borderRadius: "60px", marginBottom: "1.5vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "15hw" }}>
                        <Typography variant="body" color="text.secondary">{data.id}</Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "15hw" }}>
                        <Typography variant="body" color="text.secondary">
                            {data.point_a}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "15hw" }}>
                        <Typography variant="body" color="text.secondary">
                            {data.point_b}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "15hw" }}>
                        <Typography variant="body" color="text.secondary">
                            {data.distance}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "15hw" }}>
                        <Typography variant="body" color="text.secondary">
                            {data.cost}
                        </Typography>
                    </CardContent>
                    <CardContent>
                    <IconButton><EditIcon /></IconButton>
                    <IconButton><DeleteIcon /></IconButton>
                    </CardContent>
                </Card>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                <Button onClick={() => { loadOrderData(); }}>Обновить</Button>
            </Box>
        </Center>
    )
}
