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
import Rating from '@mui/material/Rating';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

import ButtonGroup from '@mui/material/ButtonGroup';

import { Button, Card, CardContent, TextField, Typography } from '@mui/material'

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

export default function ProfileCard() {
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

    const [userData, setUserData] = useState({
        fio: "",
        city: "",
        date_of_bith: "",
        marka: '',
        gos_nunmber: '',
        raiting: '',
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
                        fio: res?.data?.fio,
                        city: res?.data?.city,
                        date_of_bith: res?.data?.date_of_bith,
                        marka: res?.data?.marka,
                        gos_nunmber: res?.data?.gos_nunmber,
                        raiting: res?.data?.raiting,
                    })
                }
                //navigate('/')
            });
    }, []);

    function IsDriverRating(){
        if(cookies['role'] == 'driver'){
            return(
                <Rating name="read-only" value={userData.raiting}  readOnly/>
            );
        }
    }
    return (
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
                <Box sx={{marginTop: "1.5vh"}}>
                <IsDriverRating/>
                </Box>
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
                            <Box sx={{ backgroundColor: "#18181899", width: "100vw", height: "100vh" }}>
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
    )
}
