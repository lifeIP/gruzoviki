import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { SvgIcon, Button, IconButton } from "@mui/material"; 
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import refregerator from './refregerator.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Slide(){
    return(
        <Card sx={{ maxWidth: "70vw", maxHeight: "70vh", display: 'flex', borderRadius: "60px", alignItems: 'center', justifyContent: 'center' }}>
             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardMedia 
                sx={{ flex: '1 0 auto' }}
                component="img"
                alt="mashina"
                image={refregerator}
                />
                </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: "10px" }}>
                <CardContent  sx={{ flex: '1 0 auto', marginTop: "10px" }}>
                    <Typography gutterBottom variant="h4" component="div">
                    Рефрижераторный
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                    Фургон с возможностью создания и поддержания определенного    температурного режима
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "15%"}}>
                        <Button>РАССЧИТАТЬ ДОСТАВКУ</Button>
                    </Box>
                </CardContent>
            </Box>
            
        </Card>
    );
}


export default function Slider(){
    return(
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <Box sx={{float: "right", height: "70vh", marginRight: "15px"}}>
                    <IconButton sx={{marginTop: "30vh"}}>
                        <ArrowBackIosNewIcon/>
                    </IconButton>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box sx={{float: "center"}}>
                    <Slide/>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{float: "left", height: "70vh"}}>
                    <IconButton sx={{marginTop: "30vh", marginLeft: "15px"}}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    );
}