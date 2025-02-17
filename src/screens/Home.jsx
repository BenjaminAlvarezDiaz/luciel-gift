import React from "react";
import NavbarGifts from "./NavbarGifts.jsx";
import styles from "../styles/NavbarGifts.module.css";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home (){
    return (
        <div className={styles.main_container}>
            <NavbarGifts />
        </div>
    );
}

export default Home;