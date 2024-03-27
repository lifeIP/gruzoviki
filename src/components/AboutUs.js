import React from 'react'

import { Box, Grid, IconButton, Typography } from '@mui/material'

function Center(props) {
    return (
        <Grid container
            direction="row"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}>
            <Grid item>
                {props.children}
            </Grid>
        </Grid>
    )
}


export default function AboutUs() {
    return (
            <Center sx={{ height: "80vh" }}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginTop: "14vh" }}>НЕМНОГО О НАС</Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', marginTop: "4vh", width: "65vw" }}>
                    Залог нашей успешной деятельности – это наша команда. Сотрудники компании – это специалисты высочайшего уровня, 
                    обладающие большим опытом работы в транспортной отрасли и в сфере логистики. Мы следим за тем, чтобы их квалификация 
                    оставалась на должном уровне и соответствовала потребительским запросам. Это позволяет нам шагать в ногу со временем 
                    даже в условиях современного, быстро меняющегося мира. Налаженные партнерские отношения с ведущими игроками рынка 
                    перевозок делают возможной организацию быстрой доставки грузов любой сложности по адекватной стоимости. 
                    Возможности компании в области грузоперевозок растут каждый год.
                </Typography>
            </Center>
    );
}
