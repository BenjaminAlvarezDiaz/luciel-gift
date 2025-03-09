import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Letter.module.css";

function Letter (){
    const [isTable, setIsTable] = useState(window.innerWidth < 1000);

    const [popupLetter, setPopupLetter] = useState(null);

    const openPopupLetter = (content) => {
        setPopupLetter(content);
    }

    const closePopupLetter = () => {
        setPopupLetter(null);
    }

    const lettersOfLove = [
        {
            condition: "Ábrela cuando busques inspiración",
            content: "aaaaaaaaaa",
        },
        {
            condition: "Ábrela cuando sea tu cumpleaños",
            content: "aaaaaaaa",
        },
        {
            condition: "Ábrela cuando estés muy aburrida",
            content: "aaaaaaaaa",
        },
        {
            condition: "Ábrela cuando desaparezcas por 3 meses",
            content: "aaaaaaaa",
        },
        {
            condition: "Ábrela cuando sientas que el mundo es aburrido",
            content: "aaaaaaaaaa",
        },
        {
            condition: "Ábrela cuando te den ganas de ignorarme (otra vez)",
            content: "aaaaaaa",
        }
    ];

    useEffect(() => {
            const resize = () => {
                setIsTable(window.innerWidth < 1000);
            };
            window.addEventListener("resize", resize);
            return () => {
                window.removeEventListener("resize", resize);
            }
        }, []);
    return (
        <div>
            {isTable?
            (<div className={styles.main_container}>
                {lettersOfLove.map((item, index) => (
                    <div key={index} className={styles.letterItem}>
                        <div onClick={() => openPopupLetter(item.content)} className={styles.letterContent}>
                            <img src="src/assets/letterScreen/letter.png"></img>
                        </div>
                        <h2>{item.condition}</h2>
                    </div>
                ))}
                {popupLetter && (
                    <div className={styles.popup_overlay} onClick={closePopupLetter}>
                        <div className={styles.popup_content}>
                            <h4>{popupLetter}</h4>
                        </div>
                        <span className={styles.close_button} onClick={closePopupLetter}></span>
                    </div>
                )}
            </div>)
            :
            (<div className={styles.main_container}>
                <div className={styles.grid_letters}>
                {lettersOfLove.map((item, index) => (
                    <div key={index} className={styles.letterItem}>
                        <div onClick={() => openPopupLetter(item.content)} className={styles.letter_content}>
                            <img src="src/assets/letterScreen/letter.png" className={styles.letter_image}></img>
                        </div>
                        <div className={styles.letter_condition}>
                            <div className={styles.letter_circle}/>
                            <h4>{item.condition}</h4>
                            <div className={styles.letter_circle}/>
                        </div>
                    </div>
                ))}
                {popupLetter && (
                    <div className={styles.popup_overlay} onClick={closePopupLetter}>
                        <div className={styles.popup_content}>
                            <h4>{popupLetter}</h4>
                        </div>
                        <span className={styles.close_button} onClick={closePopupLetter}></span>
                    </div>
                )}
                </div>
            </div>)
            }
        </div>
    );
}

export default Letter;
