import React from 'react'
import { Box, Button, Grid } from '@mui/material'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Typography from '@mui/material/Typography';

import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router'

function Center(props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            sx={{ minHeight: '100vh' }}>
            <Grid item xs={1}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default function ExitPage() {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    return (
        <Center>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center', marginTop: "4vh" }}>
                        Вы уверены, что хотите выйти?
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={
                        ()=>{
                            setCookie('user', 0, { path: '/' });
                            navigate("/");
                        }}>Да</Button>
                    <Button sx={{ marginLeft: "3vw" }} onClick={
                        ()=>{
                            navigate("/");
                        }}>Нет</Button>
                </CardActions>
            </Card>
        </Center>
    )
}
