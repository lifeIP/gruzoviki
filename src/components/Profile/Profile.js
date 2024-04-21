import React, { useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router'

import Profile_Admin from './Profile_Admin';
import Profile_Manager from './Profile_Manager';
import Profile_User from './Profile_User';
import Profile_Driver from './Profile_Driver';

export default function Profile() {
    const [cookies, setCookie, removeCookie] = useCookies(['role', 'user','login', 'user_id', 'access_token']);
    const navigate = useNavigate();

    useEffect(()=>{
        if(cookies['user'] == 0){
            navigate("/login/");
        }
    },[])

    function Load_profile(){
        if(cookies['user'] == 0){
            navigate("/login/");
        }
        else if(cookies['role'] == 'manager'){
            return <Profile_Manager/>
        }
        else if(cookies['role'] == 'admin'){
            return <Profile_Admin/>
        }
        else if(cookies['role'] == 'user'){
            return <Profile_User/>
        }
        else if(cookies['role'] == 'driver'){
            return <Profile_Driver/>
        }
    }
    return(
        <Load_profile></Load_profile>
    );
}



