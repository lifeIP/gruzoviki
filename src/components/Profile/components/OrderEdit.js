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
    var m_order_status = order_status;

    const [cookies, setCookie, removeCookie] = useCookies(['role', 'login', 'user_id', 'access_token']);
    const navigate = useNavigate()

    function editOrderStatus() {
        console.log("editOrderStatus: ", m_order_status);

    }
    function editOrderInfo() {
        console.log("editOrderInfo: ", m_order_status);
    }
    function deleteOrder() {
        console.log("deleteOrder: ", m_order_status);
    }


    function OrderStatus() {

        if (cookies['user'] == 0) {
            navigate("/login/");
        }
        else if (cookies['role'] == 'manager') {
            if (m_order_status === 'wait') {
                return (
                    <Box sx={{float: "right"}}>
                        <IconButton onClick={() => { editOrderStatus() }}><HourglassEmptyIcon /></IconButton>
                    </Box>
                );
            }
            else if (m_order_status == 'in_progress') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><DataUsageIcon /></IconButton>
                );
            }
            else if (m_order_status == 'done') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><OfflinePinIcon /></IconButton>
                );
            }
        }
        else if (cookies['role'] == 'admin') {
            if (m_order_status === 'wait') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><HourglassEmptyIcon /></IconButton>
                        <IconButton onClick={() => { editOrderInfo() }}><EditIcon /></IconButton>
                        <IconButton onClick={() => { deleteOrder() }}><DeleteIcon /></IconButton>
                    </Box>
                );
            }
            else if (m_order_status == 'in_progress') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><DataUsageIcon /></IconButton>
                );
            }
            else if (m_order_status == 'done') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><OfflinePinIcon /></IconButton>
                );
            }
        }
        else if (cookies['role'] == 'user') {
            if (m_order_status === 'wait') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><HourglassEmptyIcon /></IconButton>
                        <IconButton onClick={() => { editOrderInfo() }}><EditIcon /></IconButton>
                        <IconButton onClick={() => { deleteOrder() }}><DeleteIcon /></IconButton>
                    </Box>
                );
            }
            else if (m_order_status == 'in_progress') {
                return (
                    <Box>
                    <IconButton onClick={() => { editOrderStatus() }}><DataUsageIcon /></IconButton>
                    </Box>
                );
            }
            else if (m_order_status == 'done') {
                return (
                    <Box>
                    <IconButton onClick={() => { editOrderStatus() }}><OfflinePinIcon /></IconButton>
                    </Box>
                );
            }
        }
        else if (cookies['role'] == 'driver') {
            if (m_order_status === 'wait') {
                return (
                    <Box>
                        <IconButton onClick={() => { editOrderStatus() }}><HourglassEmptyIcon /></IconButton>

                    </Box>
                );
            }
            else if (m_order_status == 'in_progress') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><DataUsageIcon /></IconButton>
                );
            }
            else if (m_order_status == 'done') {
                return (
                    <IconButton onClick={() => { editOrderStatus() }}><OfflinePinIcon /></IconButton>
                );
            }
        }


    }


    return (
        <Box sx={{float: "right", marginRight: "1.5vw"}}>
            <OrderStatus />
        </Box>
    );
}