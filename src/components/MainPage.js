import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MyHeader from './Header/MyHeader';
import MyFooter from "./Footer/MyFooter";
import Slider from './Slider/MySlider'
import Typography from '@mui/material/Typography';

import mySvg from './back.png';
import PopUpWindow from './CalculatingDistance/PopUpWindow';

export default function Page1({ changeTheme, selectedTheme, lightTheme }) {
    return (
        <Box>
            <Box sx={{ backgroundImage: `url(${mySvg})`, backgroundSize: "cover", width: "98.9vw", height: "100vh" }}>
                <header>
                    <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
                </header>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "3.1vh" }}>
                    <Typography variant="h1">
                        ПЕРЕВОЗИМ ГРУЗЫ
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "3.1vh" }}>
                    <Typography variant="h5">
                        В пределах города и не только
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "25.1vh" }}>
                    <PopUpWindow trig={
                        <Button variant="contained" color="error">
                            <Typography variant="h5">
                                РАССЧИТАТЬ ДОСТАВКУ
                            </Typography>
                        </Button>
                    } />
                </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "3.1vh" }}>
                <Typography variant="h2">
                    НАШИ ГРУЗОВИКИ
                </Typography>
            </Box>

            <Box sx={{ marginTop: "2.8vh" }}>
                <Slider />
            </Box>
            
            <footer>
                <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
            </footer>
        </Box>
    );
}