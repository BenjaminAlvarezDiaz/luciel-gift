import React, { useState } from "react";
import styles from "../styles/NavbarGifts.module.css";

function NavbarGifts (){
    const [activeItem, setActiveItem] = useState("puzzle");

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <nav className={styles.navigation}>
            <ul>
                <li
                    className={`${styles.list} ${activeItem === "puzzle" ? styles.active : ""}`}
                    onClick={() => handleItemClick("puzzle")}
                >
                    <a href="#puzzle">
                        <span className={styles.icon}>
                            <ion-icon name="extension-puzzle"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "puzzle" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                <li
                    className={`${styles.list} ${activeItem === "letter" ? styles.active : ""}`}
                    onClick={() => handleItemClick("letter")}
                >
                    <a href="#letter">
                        <span className={styles.icon}>
                            <ion-icon name="mail"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "letter" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                <li
                    className={`${styles.list} ${activeItem === "dice" ? styles.active : ""}`}
                    onClick={() => handleItemClick("dice")}
                >
                    <a href="#dice">
                        <span className={styles.icon}>
                            <ion-icon name="cube"></ion-icon>
                        </span>
                    </a>
                    {<div className={`${activeItem === "dice" ? styles.indicatorActive : styles.indicatorInactive}`}></div>}
                </li>

                {/*<div className={styles.indicator}></div>*/}
            </ul>
        </nav>
    );
}

export default NavbarGifts;