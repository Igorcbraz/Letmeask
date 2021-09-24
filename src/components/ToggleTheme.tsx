import React, {useState} from "react";
import DarkModeToggle from "react-dark-mode-toggle";

import '../styles/toggle.css';

export function ToggleTheme(){
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Get the root element
    let root = document.documentElement.style
    // Checking the user themes preference
    const darkThemeMq  = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(document.documentElement.style.getPropertyValue("--background"));

    if(isDarkMode || darkThemeMq){
        root.setProperty('--background'  , '#202124');
        root.setProperty(' --input-bg'   , '#434649');
        root.setProperty('--details'     , '#272626');
        root.setProperty('--details2'    , '#f8f8f8;');
        root.setProperty('--light-grey'  , '#1B1B1B');
        root.setProperty('--dark-grey'   , '#cccccf');
        root.setProperty('--border'      , '#424347');
        root.setProperty('--like'        , '#f8f8f8');
        root.setProperty('--highlighted' , '#2F2450');
        root.setProperty(' --logo'       , '#f8f8f8');
        root.setProperty('--purple'      , '#4c319e');
        root.setProperty('--pink-dark'   , '#a075d4');
    } else if(!isDarkMode || !darkThemeMq){
        root.setProperty('--background'  , '#F4F0FF');
        root.setProperty(' --input-bg'   , '#FFF');
        root.setProperty('--details'     , '#FEFEFE');
        root.setProperty('--light-grey'  , '#DBDCDD');
        root.setProperty('--dark-grey'   , '#737380');
        root.setProperty('--border'      , '#e2e2e2');
        root.setProperty('--like'        , '#835AFD');
        root.setProperty('--highlighted' , '#E3D8FF');
        root.setProperty(' --logo'       , '#222222');
        root.setProperty('--purple'      , '#835AFD');
        root.setProperty('--pink-dark'   , '#E559F9');
    }

    return(
        <div>
        <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={70}
            speed={1.1}
        />
        </div>
    );
}