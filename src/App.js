import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Cookies, useCookies } from 'react-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MyHeader from './components/Header/MyHeader';
import mySvg from './back.svg';


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

  const [selectedTheme, setSelectedTheme] = useState(()=>{
    if(cookies.theme === undefined){
      setCookie('theme', true, { path: '/' });  
      return lightTheme;
    }
    else{
      if(cookies.theme) return lightTheme; 
      else return darkTheme;
    }
  });

  function changeTheme(){
    if(selectedTheme == lightTheme) setSelectedTheme(darkTheme);
    else setSelectedTheme(lightTheme);
    setCookie('theme', selectedTheme == lightTheme ? false : true, { path: '/' });
  }

  return (
    <div>
      <ThemeProvider theme={selectedTheme}>
        <Box sx={{backgroundImage: `url(${mySvg})`, backgroundSize: "cover", width: "100vw", height: "100vh"}}> 
          <MyHeader selectedTheme={selectedTheme == lightTheme ? true:false} changeTheme={changeTheme}/>
          <CssBaseline />
        </Box>
        <Box sx={{height: 150}}></Box>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
