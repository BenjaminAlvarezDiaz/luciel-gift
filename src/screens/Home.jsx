import React from "react";
import NavbarGifts from "./NavbarGifts.jsx";
import styles from "../styles/NavbarGifts.module.css";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Puzzle from "./Puzz.jsx";
import Letter from "./Letter.jsx";
import Dice from "./Dice.jsx";

function Home (){
    return (
        <nav className={styles.main_container}>
            <NavbarGifts />
            <div className={styles.content}>
                <div>
                    <div>
                        <div id="puzzle" className={styles.puzzle}>
                            <Puzzle />
                        </div>
                    </div>

                    <br />
                    <br />

                    <div>
                        <div id="letter" className={styles.letter}>
                            <Letter />
                        </div>
                    </div>

                    <br />
                    <br />

                    <div>
                        <div id="dice" className={styles.dice}>
                            <Dice />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Home;