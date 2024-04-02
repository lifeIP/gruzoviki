import React from 'react'

import Box from '@mui/material/Box';
import Popup from 'reactjs-popup';
import { Button, Card, CardContent, TextField, Typography, CardMedia } from '@mui/material'
import { Grid } from '@mui/material'

import useForm from '../hooks/useForm'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { Cookies, useCookies } from 'react-cookie';

function Center(props) {
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

const getFreshModel = () => ({
    tonnazh: '',
    a: '',
    b: '',
    cost: ''
})

export default function PopUpWindow({trig}) {
    const navigate = useNavigate()
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const calculating = e => {
        e.preventDefault();
        if (true)
            axios.post("http://localhost:5041/calculating/", values)
                .then(res => {
                    console.log("Calculating");
                    // close();
                })
                .catch(err => {console.log(err);
                    console.log("Calculating");
                    // close();
                })
    }
    return (
            <Popup trigger=
                {
                    trig
                }
                modal nested>
                {
                    close => (
                        <Box sx={{ backgroundColor: "#18181899", width: "100vw", height: "100svh" }}>
                            <Center>
                                <Card sx={{ maxWidth: "70vw", height: "60vh", display: 'flex', borderRadius: "60px", alignItems: 'center', justifyContent: 'center' }}>
                                    <CardMedia
                                        sx={{ flex: '1 0 auto', width: "40vw", height: "50vh", marginLeft: "1.5vw" }}
                                        component="img"
                                        alt="mashina"
                                        image="https://static.tildacdn.com/tild3433-3034-4465-b338-623263653534/img_bb.jpg"

                                    />
                                    <Box sx={{ marginLeft: "1.5vw", marginRight: "4.5vw" }}>
                                        <Typography variant="h4">
                                        Подсчет расстояния
                                        </Typography>
                                        <Box sx={{
                                            '& .MuiTextField-root': {
                                                m: 1,
                                                width: '90%'
                                            }
                                        }}>
                                            <form noValidate autoComplete="off" onSubmit={calculating}>
                                                <TextField
                                                    label="Тоннаж"
                                                    name="tonnazh"
                                                    value={values.tonnazh}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    {...(errors.tonnazh && { error: true, helperText: errors.tonnazh })} />
                                                <TextField
                                                    label="Точка отправления"
                                                    name="a"
                                                    value={values.a}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    {...(errors.a && { error: true, helperText: errors.a })} />
                                                <TextField
                                                    label="Точка прибытия"
                                                    name="b"
                                                    value={values.b}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    {...(errors.b && { error: true, helperText: errors.b })} />
                                                <TextField
                                                    label="Сумма"
                                                    name="cost"
                                                    value={values.cost}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    {...(errors.cost && { error: true, helperText: errors.cost })} />
                                            </form>
                                            <Button onClick=
                                                {() => close()}>
                                                Отмена
                                            </Button>
                                        </Box>
                                    </Box>

                                </Card>
                            </Center>
                        </Box>
                    )
                }
            </Popup>
    )
}
