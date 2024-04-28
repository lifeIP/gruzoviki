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
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'

import OrderEdit from './components/OrderEdit';
import ProfileCard from './components/ProfileCard';
import OrderCard from './components/OrderCard';



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
    const [cookies, setCookie, removeCookie] = useCookies(['order_status', 'role', 'login', 'user_id', 'access_token']);

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


    function allOrders() {
        if (cookies["role"] == "user") {
            axios.post("http://localhost:8000/order/get/all", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {
                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }
        else if (cookies["role"] == "manager" || cookies["role"] == "admin") {
            axios.post("http://localhost:8000/order/manager/get/all/", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {
                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }
    }

    function waitOrders() {
        if (cookies["role"] == "user") {
            axios.post("http://localhost:8000/order/get/wait", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {
                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }
        else if (cookies["role"] == "manager" || cookies["role"] == "admin") {
            axios.post("http://localhost:8000/order/manager/get/wait", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {
                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }
    }

    function in_progressOrders() {
        if (cookies["role"] == "user") {
            axios.post("http://localhost:8000/order/get/in_progress", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {
                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }
        else if (cookies["role"] == "manager" || cookies["role"] == "admin") {
            axios.post("http://localhost:8000/order/manager/get/in_progress", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {
                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }
    }

    function doneOrders() {
        if (cookies["role"] == "user") {
            axios.post("http://localhost:8000/order/get/done", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {

                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }
        else if (cookies["role"] == "manager" || cookies["role"] == "admin") {
            axios.post("http://localhost:8000/order/manager/get/done", values)
                .then(res => {
                    console.log(res.data);
                    if (res.data.error) {
                        setOrderData([]);
                    }
                    else {
                        console.log();
                        if (res.data == undefined) {
                            setOrderData([]);
                        }

                        else {

                            // console.log(res.data.content.length);
                            var data = [];
                            var i = 0;
                            while (i < res.data.len) {
                                console.log(i);
                                console.log(res.data);
                                data.push({ id: res?.data[i][0], name: res?.data[i][3], point_a: res?.data[i][5], point_b: res?.data[i][6], order_status: res?.data[i][8] });
                                i += 1;
                                setOrderData(data);
                            }
                        }
                    }
                    //navigate('/')
                })
        }

    }

    useEffect(() => {
        if (cookies['user'] == 0) {
            navigate("/login/");
        }

        allOrders();
    }, []);





    return (
        <Center>
            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }} fontWeight={600}>
                ПРОФИЛЬ
            </Typography>
            <ProfileCard />
            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }} fontWeight={600}>
                История поездок
            </Typography>
            <Box variant="text" aria-label="Basic button group" sx={{ alignItems: 'center', display: "flex", justifyContent: "center", marginBottom: "2vh" }}>
                <Button sx={{ marginRight: "3vw" }} onClick={() => { allOrders() }}>Все заказы</Button>
                <Button sx={{ marginRight: "3vw" }} onClick={() => { waitOrders() }}>В обработке</Button>
                <Button sx={{ marginRight: "3vw" }} onClick={() => { in_progressOrders() }}>Текущие</Button>
                <Button onClick={() => { doneOrders() }}>Завершенные</Button>
            </Box>
            {
                orderData.map((data) => (
                    <OrderCard data={data} />
                ))}
        </Center>
    );
}



