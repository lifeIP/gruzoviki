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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NavigationIcon from '@mui/icons-material/Navigation';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export default function OrderCard({ data }) {

    return (
        <Card sx={{ width: "65vw", height: "15vh", display: 'flex', borderRadius: "35px", marginBottom: "1.5vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3}>
            <Grid item>
            <Box sx={{marginLeft: "3.5vw"}}><PointOfSaleIcon/></Box>
            
            </Grid>
                <Grid item xs='1'>
                    
                    <Typography variant="body2" color="text.secondary"># {data.id}</Typography>
                    
                </Grid>
                <Grid item xs='2'>
                    <Typography variant="body2" color="text.secondary">{data.name}</Typography>
                </Grid>
                <Grid item><NavigationIcon/></Grid>
                <Grid item>
                    <Typography variant="body2" color="text.secondary">
                        {data.point_a}
                    </Typography>
                </Grid>
                <Grid item>
                    <ArrowRightAltIcon/>
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="text.secondary">
                        {data.point_b}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="text.secondary">
                        {data.cost}
                    </Typography>
                </Grid>
            </Grid>
            <OrderEdit id={data.id} order_status={data.order_status} />
        </Card>
    )
}
