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

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login, Registration} from "./components/Form/MyForm";

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
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);
  //const [theme, setTheme] = useState(darkTheme);

  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (cookies.theme === undefined) {
      setCookie('theme', true, { path: '/' });
      return lightTheme;
    }
    else {
      if (cookies.theme) return lightTheme;
      else return darkTheme;
    }
  });

  function changeTheme() {
    if (selectedTheme == lightTheme) setSelectedTheme(darkTheme);
    else setSelectedTheme(lightTheme);
    setCookie('theme', selectedTheme == lightTheme ? false : true, { path: '/' });
  }

  return (
    <div>
      <ThemeProvider theme={selectedTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage changeTheme={changeTheme} selectedTheme={selectedTheme} lightTheme={lightTheme} />} />
            <Route path="/login" element={
            <div>
              <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme}/>
              <Login/>
              <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme}/>
            </div>} 
            />
            <Route path="/registration" element={
            <div>
              <MyHeader selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme}/>
              <Registration/>
              <MyFooter selectedTheme={selectedTheme == lightTheme ? true : false} changeTheme={changeTheme}/>
              </div>
            } />
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </ThemeProvider>

    </div>
  );
}

export default App;
