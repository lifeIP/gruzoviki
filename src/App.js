import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Cookies, useCookies } from 'react-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import MyHeader from './components/MyHeader';

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
    <ThemeProvider theme={selectedTheme}>
      <MyHeader selectedTheme={selectedTheme == lightTheme ? true:false} changeTheme={changeTheme}/>
      <div className="App">
        <Button  
          onClick={() => {
            changeTheme();
            console.log(cookies.theme);
          }}
          variant="chtheme"
        >
          Change theme
        </Button>
        <Button  
        onClick={() => {
          console.log(cookies.theme);
        }}
        variant="chtheme">Change theme</Button>

      </div>
      <CssBaseline />
      
    </ThemeProvider>
  );
}

export default App;
