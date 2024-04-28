import React, { useEffect } from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import useForm from '../hooks/useForm'
import { useState } from "react";
import { useNavigate } from 'react-router'
import { Grid } from '@mui/material'
import { Cookies, useCookies } from 'react-cookie';
import axios from 'axios'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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


export default function BecomeDriver() {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'user_id', 'access_token', 'role']);

    useEffect(()=>{
        if(cookies['user'] == 0){
            navigate("/login/");
        }
    },[])

    class ImageEncoder extends React.Component {
        state = {
            imageBinary: '',
            user_id: cookies['user_id'],
            access_token: cookies['access_token'],
        };

        fileSelectedHandler = event => {
            const file = event.target.files[0]; //let image_file = canvas.toDataURL()
            
            const formData = new FormData();
            formData.append('file', file);

            const res = fetch("http://localhost:8000/becomed_driver/img/",{
                method: 'POST',
                body: formData,
            });
            res.then(data =>{
                console.log("POST");
                console.log(data);
            })
           
        }

        load_img = event => {
            this.fileSelectedHandler(event);
        }

        render() {
            return (
                <div>
                    <input type="file" onChange={this.load_img} />
                </div>
            );
        }
    }

    const getFreshModel = () => ({
        user_id: cookies['user_id'],
        access_token: cookies['access_token'],
        tonaz: '',
        marka: '',
        gosnumber: '',
    })
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);
    const [selectedImage, setSelectedImage] = useState(null);
    // const validate = () => {
    //     let temp = {}
    //     temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
    //     temp.password = values.password != "" ? "" : "Это обязательное поле"
    //     setErrors(temp)
    //     return Object.values(temp).every(x => x == "")
    // }
    const order = e => {
        e.preventDefault();
        if (1) {
            axios.post("http://localhost:8000/becomed_driver/", values)
                .then(res => {
                    if (res.data.error) {

                    }
                    else {
                        navigate('/')
                    }
                    //navigate('/')
                })
                .catch(err => {
                    console.log(err);
                    // navigate('/')
                });
        }
    }

    return (
        <Center>
            <Card sx={{ borderRadius: "60px", width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ my: 3 }}>
                        Хотите стать водителем?
                    </Typography>
                    <Typography variant="h5" sx={{ my: 3 }}>
                        Заполните анкету
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={order}>
                            <TextField
                                label="Тоннаж вашего тс"
                                name="tonaz"
                                value={values.tonaz}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.tonaz && { error: true, helperText: errors.tonaz })} />
                            <TextField
                                label="Марка тс"
                                name="marka"
                                value={values.marka}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.marka && { error: true, helperText: errors.marka })} />

                            <TextField
                                label="Гос. номер тс"
                                name="gosnumber"
                                value={values.gosnumber}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.gosnumber && { error: true, helperText: errors.gosnumber })} />

                            <Box sx={{
                                width: "90%", m: 1,
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <ImageEncoder></ImageEncoder>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ОТПРАВИТЬ ЗАЯВКУ</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
}