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

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

import ButtonGroup from '@mui/material/ButtonGroup';

import { Button, Card, CardContent, TextField, Typography } from '@mui/material'

import OrderEdit from './OrderEdit';

export default function OrderCard({ data }) {

    return (
        <Card sx={{ width: "65vw", height: "15vh", display: 'flex', borderRadius: "35px", marginBottom: "1.5vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Box sx={{marginLeft: "1.5vw"}}>
                    <Typography variant="body2" color="text.secondary">Номер заказа: {data.id}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">Товар: {data.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">
                        Точка отправления: {data.point_a}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">
                        Точка прибытия: {data.point_b}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2" color="text.secondary">
                        {data.cost}
                    </Typography>

                </Grid>
                <Grid item xs={2}>
                    <OrderEdit id={data.id} order_status={data.order_status} />

                </Grid>
            </Grid>
        </Card>
    )
}
