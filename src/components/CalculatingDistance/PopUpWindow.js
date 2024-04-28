import React, { useState } from 'react'

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



export default function PopUpWindow({trig}) {
    const getFreshModel = () => ({
        tonnazh: '',
        a: '',
        b: '',
        cost: '0'
    })

    const navigate = useNavigate()
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const [cost, setCost] = useState(0);

    const validate = () => {
        let temp = {}
        temp.tonnazh = !isNaN(values.tonnazh) ? "" : "Некоректный тоннаж"
        temp.a = values.a != "" ? "" : "Это обязательное поле"
        temp.b = values.b != "" ? "" : "Это обязательное поле"
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }


    const calculating = e => {
        e.preventDefault();
        if (validate())
            console.log("calculating");
            axios.post("http://localhost:8000/calculating/", values)
                .then(res => {
                    if (res.data.error) {
                        navigate('/')
                    }
                    else {
                        if(!isNaN(Math.round(res.data.result * values.tonnazh * 7))){
                            setCost(Math.round(res.data.result * values.tonnazh * 7));
                        }
                        else{
                            setCost(0);
                        }
                    }
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
                                        Подсчет суммы
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
                                                <Box
                                                    alignItems="center" 
                                                    justifyContent="center" 
                                                    display="flex" 
                                                    mr="15px">
                                                    <Button type="submit"
                                                    variant="contained" >
                                                        Расчитать  
                                                    </Button>
                                                </Box>
                                                {/* <TextField
                                                    label="Сумма"
                                                    name="cost"
                                                    value={values.cost}
                                                    onChange={handleInputChange}
                                                    variant="outlined"
                                                    {...(errors.cost && { error: true, helperText: errors.cost })} /> */}
                                                <Box
                                                    mt="10px"
                                                    alignItems="center" 
                                                    justifyContent="center" 
                                                    display="flex" 
                                                    mr="15px">
                                                    <Typography variant="h6" >
                                                        Сумма: {cost}
                                                    </Typography>
                                                </Box>
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
