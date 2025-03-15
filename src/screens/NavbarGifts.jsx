import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import styles from "../styles/NavbarGifts.module.css";

function NavbarGifts (){
    const [activeItem, setActiveItem] = useState("");
    const location = useLocation();

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    useEffect(() => {
        
        return () => {
            if(location.hash !== ""){
                setActiveItem(location.hash);
            } else if (location.pathname === "/"){
                setActiveItem("#puzzle");
            }
        }
    }, []);

    return (
        <nav className={styles.navigation}>
            <ul>
                <li
                    className={`${styles.list} ${activeItem === "#puzzle" && location.pathname === "/" ? styles.active : ""}`}
                    onClick={() => handleItemClick("#puzzle")}
                >
                    <a href="#puzzle">
                        <span className={styles.icon}>
                            <ion-icon name="extension-puzzle"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "#puzzle" && location.pathname === "/" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                <li
                    className={`${styles.list} ${activeItem === "#letter" && location.hash === "#letter" ? styles.active : ""}`}
                    onClick={() => handleItemClick("#letter")}
                >
                    <a href="#letter">
                        <span className={styles.icon}>
                            <ion-icon name="mail"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "#letter" && location.hash === "#letter" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                <li
                    className={`${styles.list} ${activeItem === "#dice" && location.hash === "#dice" ? styles.active : ""}`}
                    onClick={() => handleItemClick("#dice")}
                >
                    <a href="#dice">
                        <span className={styles.icon}>
                            <ion-icon name="cube"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "#dice" && location.hash === "#dice" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                {/*<div className={styles.indicator}></div>*/}
            </ul>
        </nav>
    );
}

export default NavbarGifts;