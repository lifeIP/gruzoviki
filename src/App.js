import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Cookies, useCookies } from 'react-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MyHeader from './components/Header/MyHeader';
import MyFooter from "./components/Footer/MyFooter";
import Slider from './components/Slider/MySlider'
import Typography from '@mui/material/Typography';

import MainPage from "./components/MainPage";
import Profile from "./components/Profile";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Registration } from "./components/Form/MyForm";
import ExitPage from "./components/ExitPage";
import AboutUs from "./components/AboutUs";


import mySvg from './back_about.png';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['my_theme']);
  //const [theme, setTheme] = useState(darkTheme);

  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (cookies.my_theme === undefined) {
      setCookie('my_theme', true, { path: '/' });
      return lightTheme;
    }
    else {
      if (cookies.my_theme) return lightTheme;
      else return darkTheme;
    }
  });

  function changeTheme() {
    if (selectedTheme == lightTheme) setSelectedTheme(darkTheme);
    else setSelectedTheme(lightTheme);
    setCookie('my_theme', selectedTheme == lightTheme ? false : true, { path: '/' });
  }

  return (
    <div>
      <ThemeProvider theme={selectedTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage changeTheme={changeTheme} selectedTheme={selectedTheme} lightTheme={lightTheme} />} />
            <Route path="/login" element={
              <div>
                <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
                <Login />
                <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
              </div>}
            />
            <Route path="/registration" element={
              <div>
                <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
                <Registration />
                <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
              </div>
            } />
            <Route path="/profile" element={
              <div>
                <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
                <Profile />
                <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
              </div>
            } />
            <Route path="/exit" element={
              <div>
                <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
                <ExitPage/>
                <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
              </div>
            } />
            <Route path="/about" element={
              
              <Box sx={{ backgroundImage: `url(${mySvg})`, backgroundSize: "cover", width: "100vw", height: "100vh" }}>
              <Box sx={{backgroundColor:"#18181899"}}>
                <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
                <AboutUs/>
                <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme} />
                </Box>
              </Box>
            } />
            
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
