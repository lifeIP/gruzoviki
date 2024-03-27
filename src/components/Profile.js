import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Box, Grid, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';


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

export default function Profile() {
    // const dataModel = () => ({
    //     id: '',
    //     point_a: '',
    //     point_b: '',
    //     distance: 0,
    //     cost: 0,
    // })

    const [orderData, setOrderData] = useState([]);

    function loadOrderData() {
        setOrderData(() => [...orderData, { id: -1, point_a: 'Точка А', point_b: 'Точка Б', distance: 1555000, cost: 1555000 }])
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
                        Фамилия Имя Отчество
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ГОРОД, ДД.ММ.ГГГГ
                    </Typography>
                </CardContent>
                <CardActions sx={{ marginRight: "1.5vw" }}>
                    <IconButton size="small"><EditIcon /></IconButton>
                    <IconButton size="small"><DeleteIcon /></IconButton>
                </CardActions>
            </Card>
            <Typography gutterBottom variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }}>
                История поездок
            </Typography>
            {orderData.map((data) => (
                <Card sx={{ width: "45vw", height: "10vh", display: 'flex', borderRadius: "60px", marginBottom: "1.5vh", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "13hw"}}>
                        <Typography variant="body" color="text.secondary">Номер заказа: {data.id}</Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "13hw"}}>
                        <Typography variant="body" color="text.secondary">
                            {data.point_a}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "13hw"}}>
                        <Typography variant="body" color="text.secondary">
                            {data.point_b}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "13hw"}}>
                        <Typography variant="body" color="text.secondary">
                            {data.distance}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ marginLeft: '1.5vw', width: "13hw"}}>
                        <Typography variant="body" color="text.secondary">
                            {data.cost}
                        </Typography>
                    </CardContent>
                    <CardContent></CardContent>
                </Card>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                <Button onClick={() => { loadOrderData(); }}>Обновить</Button>
            </Box>
        </Center>
    )
}
