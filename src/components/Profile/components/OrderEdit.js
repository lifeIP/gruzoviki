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
import DataUsageIcon from '@mui/icons-material/DataUsage';



export default function OrderEdit({ id, order_status }) {
    var m_id = id;
    const[mOrderStatus, setOrderStatus] = useState(order_status);

    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(['m_id', 'order_status', 'role', 'login', 'user_id', 'access_token']);

    const getFreshModel = () => ({
        user_id: cookies['user_id'],
        access_token: cookies['access_token'],
        m_id: m_id,
        order_status: "wait",
    })

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);


    function editOrderStatus(order_status) {
        values.order_status = order_status;
        setOrderStatus(order_status);
        if(cookies["role"] == "manager"){
            axios.post("http://localhost:8000//changeStatus/", values)
            .then(res => {
                console.log(res);
            })
        }
    }

    function editOrderInfo() {
        setCookie('m_id', m_id);
        navigate("/orderChangeInfo");
    }

    function deleteOrder() {
        console.log("deleteOrder: ", mOrderStatus);
        if(cookies["role"] == "user"){

        }
        else if(cookies["role"] == "manager"){

        }
    }


    function OrderStatus() {

        if (cookies['user'] == 0) {
            navigate("/login/");
        }
        else if (cookies['role'] == 'manager') {
            if (mOrderStatus === 'wait') {
                return (
                    <Box sx={{ float: "right" }}>
                        <IconButton onClick={() => { editOrderStatus("in_progress") }}><HourglassEmptyIcon /></IconButton>
                        <IconButton onClick={() => { editOrderInfo() }}><EditIcon /></IconButton>
                        <IconButton onClick={() => { deleteOrder() }}><DeleteIcon /></IconButton>
                    </Box>
                );
            }
            else if (mOrderStatus == 'in_progress') {
                return (
                    
                    <Box sx={{ float: "right" }}>
                        <IconButton onClick={() => { editOrderStatus("done") }}><DataUsageIcon /></IconButton>
                    </Box>
                );
            }
            else if (mOrderStatus == 'done') {
                return (
                    <Box sx={{ float: "right" }}>
                        <IconButton onClick={() => { editOrderStatus("wait") }}><OfflinePinIcon /></IconButton>
                    </Box>
                );
            }
        }
        else if (cookies['role'] == 'admin') {
            if (mOrderStatus === 'wait') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><HourglassEmptyIcon /></IconButton>
                        <IconButton onClick={() => { editOrderInfo() }}><EditIcon /></IconButton>
                        <IconButton onClick={() => { deleteOrder() }}><DeleteIcon /></IconButton>
                    </Box>
                );
            }
            else if (mOrderStatus == 'in_progress') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><DataUsageIcon /></IconButton>
                );
            }
            else if (mOrderStatus == 'done') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><OfflinePinIcon /></IconButton>
                );
            }
        }
        else if (cookies['role'] == 'user') {
            if (mOrderStatus === 'wait') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><HourglassEmptyIcon /></IconButton>
                        <IconButton onClick={() => { editOrderInfo() }}><EditIcon /></IconButton>
                        <IconButton onClick={() => { deleteOrder() }}><DeleteIcon /></IconButton>
                    </Box>
                );
            }
            else if (mOrderStatus == 'in_progress') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><DataUsageIcon /></IconButton>
                    </Box>
                );
            }
            else if (mOrderStatus == 'done') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><OfflinePinIcon /></IconButton>
                    </Box>
                );
            }
        }
        else if (cookies['role'] == 'driver') {
            if (mOrderStatus === 'wait') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><HourglassEmptyIcon /></IconButton>

                    </Box>
                );
            }
            else if (mOrderStatus == 'in_progress') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><DataUsageIcon /></IconButton>
                );
            }
            else if (mOrderStatus == 'done') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><OfflinePinIcon /></IconButton>
                );
            }
        }


    }


    return (
        <Box sx={{ float: "right", marginRight: "1.5vw" }}>
            <OrderStatus />
        </Box>
    );
}