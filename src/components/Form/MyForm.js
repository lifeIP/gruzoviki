import React, { useEffect } from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import useForm from '../hooks/useForm'

import { useNavigate } from 'react-router'
import { Grid } from '@mui/material'
import { Cookies, useCookies } from 'react-cookie';
import axios from 'axios'


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const getFreshModel = () => ({
    name: '',
    email: '',
    telephone: '',
    date_of_birth: '',
    password: '',
})

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

export function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['login', 'role']);
    const navigate = useNavigate()

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
        temp.password = values.password != "" ? "" : "Это обязательное поле"
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    const login = e => {
        e.preventDefault();
        if (validate())
            axios.post("http://localhost:5041/login/", values)
                .then(res => {
                    setCookie('user', res, { path: '/' });
                    setCookie('role', res.role, { path: '/' });
                    navigate('/')
                })
                .catch(err => {console.log(err);
                    setCookie('user', 1, { path: '/' });
                    setCookie('role', 0, { path: '/' });
                    navigate('/')
                })
    }

    return (
        <Center>
            <Card sx={{borderRadius: "60px", width: 400}}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Войти
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="Password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ВОЙТИ</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
}


export function Registration() {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const navigate = useNavigate()

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
        temp.password = values.password != "" ? "" : "Это обязательное поле"
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    const registration = e => {
        e.preventDefault();
        if (validate())
            axios.post("http://localhost:5041/registration/", values)
                .then(res => {
                    navigate('/')
                })
                .catch(err => {console.log(err);
                    navigate('/')
                });
            axios.post("http://localhost:5041/login/", values)
                .then(res => {
                    setCookie('user', res, { path: '/' });
                    navigate('/')
                })
                .catch(err => {console.log(err);
                    setCookie('user', 1, { path: '/' });
                    navigate('/')
                });
    }

    return (
        <Center>
            <Card sx={{borderRadius: "60px", width: 400}}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Регистрация
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={registration}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.name && { error: true, helperText: errors.name })} />
                            <TextField
                                label="Номер телефона"
                                name="telephone"
                                value={values.telephone}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.telephone && { error: true, helperText: errors.telephone })} />
                            <TextField
                                label="Дата рождения"
                                name="date_of_birth"
                                value={values.date_of_birth}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.date_of_birth && { error: true, helperText: errors.date_of_birth })} />
                                
                            <TextField
                                label="Ваша почта"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="Пароль"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
}


export function Order() {
    const navigate = useNavigate()
    const getFreshModel = () => ({
        type: '',
        tonaz: '',
        a: '',
        b: '',
        type_of_machina: '',
    })
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    // const validate = () => {
    //     let temp = {}
    //     temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
    //     temp.password = values.password != "" ? "" : "Это обязательное поле"
    //     setErrors(temp)
    //     return Object.values(temp).every(x => x == "")
    // }

    const order = e => {
        e.preventDefault();
        if (1)
            axios.post("http://localhost:5041/order/", values)
                .then(res => {
                    navigate('/')
                })
                .catch(err => {console.log(err);
                    navigate('/')
                });
    }

    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <Center>
            <Card sx={{borderRadius: "60px", width: 400}}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Заказ
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={order}>
                            <TextField
                                label="Что перевозим?"
                                name="type"
                                value={values.type}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.type && { error: true, helperText: errors.type })} />
                            <TextField
                                label="Тоннаж"
                                name="tonaz"
                                value={values.tonaz}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.tonaz && { error: true, helperText: errors.tonaz })} />
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

                                <FormControl fullWidth sx={{m: 1, width: '90%'}}>
                                <InputLabel id="type_of_machina">Выберете тип фургона</InputLabel>
                                <Select
                                    labelId=""
                                    id="simple-select"
                                    value={type}
                                    label="type_of_mashina"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Изотермический</MenuItem>
                                    <MenuItem value={20}>Тентованный</MenuItem>
                                    <MenuItem value={30}>Рефрижератор</MenuItem>
                                    <MenuItem value={40}>С увеличенной грузоподъемностью</MenuItem>
                                </Select>
                                </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>ОФОРМИТЬ ЗАЯВКУ</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
}

export function BecomeDriver() {
    const navigate = useNavigate()
    const getFreshModel = () => ({
        tonaz: '',
        marka: '',
        gosnumber: ''
    })
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    // const validate = () => {
    //     let temp = {}
    //     temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
    //     temp.password = values.password != "" ? "" : "Это обязательное поле"
    //     setErrors(temp)
    //     return Object.values(temp).every(x => x == "")
    // }

    const order = e => {
        e.preventDefault();
        if (1)
            axios.post("http://localhost:5041/becomed_driver/", values)
                .then(res => {
                    navigate('/')
                })
                .catch(err => {console.log(err);
                    navigate('/')
                });
    }

    return (
        <Center>
            <Card sx={{borderRadius: "60px", width: 400}}>
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

export function ChangeUserData() {
    const navigate = useNavigate()
    const getFreshModel = () => ({
        fio: '',
        date: '',
        city: '',
        eas: "",
    })

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    // const validate = () => {
    //     let temp = {}
    //     temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Некоректный адрес"
    //     temp.password = values.password != "" ? "" : "Это обязательное поле"
    //     setErrors(temp)
    //     return Object.values(temp).every(x => x == "")
    // }

    const order = e => {
        e.preventDefault();
        if (1)
            axios.post("http://localhost:5041/user_data/", values)
                .then(res => {
                    navigate('/profile')
                })
                .catch(err => {console.log(err);
                    navigate('/profile')
                });
    }

    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        
            <Center2>
                <Card  sx={{borderRadius: "60px"}}>
                
                <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ my: 3 }}>
                    Изменить данные
                </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={order}>
                            <TextField
                                label="Фамилия Имя Отчество"
                                name="fio"
                                value={values.fio}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                            
                            <TextField
                                label="Город"
                                name="city"
                                value={values.city}
                                onChange={handleInputChange}
                                variant="outlined"
                                />
                            <TextField
                                label="Дата"
                                name="date"
                                value={values.date}
                                onChange={handleInputChange}
                                variant="outlined"
                                />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>Изменить</Button>
                        </form>
                    </Box>
                </CardContent>
                </Card>
            </Center2>
    );
}