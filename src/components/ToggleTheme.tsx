import {useState} from "react";
import Switch from "react-switch";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/toggle.css';
import 'material-design-icons/iconfont/material-icons.css';

export function ToggleTheme(){
    // Checking the user themes preference
    const darkThemeMq  = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let preferTheme;
    if(darkThemeMq){
        preferTheme = 'dark'
    } else {
        preferTheme = 'light'
    }

    const [darkMode, setDarkMode] = useState(preferTheme);

    const changeTheme = () => {
        setDarkMode(darkMode === 'light' ? 'dark' : 'light')

        toast.success('Tema alterado com sucesso', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }

    const root = document.documentElement.style
    const theme = {
        light(){
            root.setProperty('--background'  , '#F4F0FF');
            root.setProperty(' --input-bg'   , '#FFF');
            root.setProperty('--details'     , '#FEFEFE');
            root.setProperty('--light-grey'  , '#DBDCDD');
            root.setProperty('--dark-grey'   , '#737380');
            root.setProperty('--border'      , '#e2e2e2');
            root.setProperty('--like'        , '#835AFD');
            root.setProperty('--highlighted' , '#E3D8FF');
            root.setProperty('--logo'        , '#222222');
            root.setProperty('--purple'      , '#835AFD');
            root.setProperty('--pink-dark'   , '#E559F9');
        },
        dark(){
            root.setProperty('--background'  , '#202124');
            root.setProperty(' --input-bg'   , '#434649');
            root.setProperty('--details'     , '#272626');
            root.setProperty('--details2'    , '#f8f8f8;');
            root.setProperty('--light-grey'  , '#1B1B1B');
            root.setProperty('--dark-grey'   , '#cccccf');
            root.setProperty('--border'      , '#424347');
            root.setProperty('--like'        , '#f8f8f8');
            root.setProperty('--highlighted' , '#2F2450');
            root.setProperty('--logo'       , '#f8f8f8');
            root.setProperty('--purple'      , '#4c319e');
            root.setProperty('--pink-dark'   , '#a075d4');
        }
    };

    if(darkMode === 'dark'){
        theme.dark();
    } else {
        theme.light();
    }

    return(
        <>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <button className="toggleTheme" onClick={changeTheme}>
                <span 
                    className="material-icons svgTheme"
                >
                    {darkMode === 'light' ? 
                    <span>&#xe518;</span> : 
                    <span>&#xf03d;</span>}
                </span>
            </button>
        </>
    );
}