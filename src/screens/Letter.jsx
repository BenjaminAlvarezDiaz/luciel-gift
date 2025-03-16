import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Letter.module.css";
import letterImage from "../assets/letterScreen/letter.png";
import happyBirthdayAudio from "../assets/letterScreen/happyBirthdayLuciel.ogg";

import { motion } from "framer-motion";
import { createPortal } from "react-dom";

function Letter (){
    const [isTable, setIsTable] = useState(window.innerWidth < 1000);

    const [popupLetter, setPopupLetter] = useState(null);

    const [popupLetterBirthday, setPopupLetterBirthday] = useState(false);
    const birthdayAudio = new Audio(happyBirthdayAudio);

    const openPopupLetter = (content, index) => {
        if(index === 1){
            setPopupLetterBirthday(true);
        }
        setPopupLetter(content);
    }

    const closePopupLetter = () => {
        setPopupLetterBirthday(false);
        birthdayAudio.pause();
        setPopupLetter(null);
    }

    const lettersOfLove = [
        {
            condition: "Ábrela cuando busques inspiración",
            content: `Caí en un agujero 
                    eternamente oscuro 
                    Aunque puedo salir
                    ¿Qué perderé después de ver la luz?

                    Erase un árbol
                    Y Erase alguien que se odiaba
                    Erase un abrazo
                    Y luego un estruendo
                    Erase un alma
                    Y luego nada
                    Erase el mundo
                    Erase yo

                    No puedo hablar por mí
                    No puedo sentir
                    No puedo nadar
                    No puedo ver que está bien
                    Era un cadáver que podía hablar,
                    dormía hasta irse con el viento
                    Pensaba, pensaba y pensaba
                    Pero nunca se levantaba de su tumba
                    No quería caminar, no quería pudrirse
                    Así que cerraba sus ojos
                    Y se imaginaba con vida

                    Le dije que tuve un sueño,
                    que el cielo me hablaba y no le pude entender
                    así que desperté
                    Le que dije que para mí el sol es un punto
                    que desaparece apenas abro los ojos
                    Le dije que duermo sobre cadenas y cables
                    que se clavan en mi piel
                    Le dije que persigo las manecillas de un reloj furioso
                    que desearía estuviera roto

                    Me pregunta si el camino largo o corto
                    Me pregunto si importa
                    Ambos llevan al mismo lugar
                    Quiero dejar de caminar correr en su lugar
                    Pero me detengo en el ultimo paso
                    Al borde Un paso del final
                    Tengo miedo`,
        },
        {
            condition: "Ábrela cuando sea tu cumpleaños",
            content: `¡FELIZ CUMpleaños!
                    Espero que realmente la pases muy bien
                    y sino, al menos espero la pases bien
                    a la noche~ Te aprecio y si me necesitas
                    seguro estaré por ahí`,
        },
        {
            condition: "Ábrela cuando estés muy aburrida",
            content: `Hoy regalé una flor, 
                    perdida en mis recuerdos 

                    No encuentro salida, pues no existe 
                    Cien vacíos devoran esta mente 
                    Donde sólo demonios habitan 

                    No encuentro una razón, pues la perdí hace tiempo 
                    La estática es un sótano oscuro 
                    Donde sólo las ratas anidan 

                    ¿Hace cuánto tus manos no sienten calidez? 
                    ¿Hace cuánto no encuentras perdón? 
                    ¿Puedes si quiera sentir el latir en tu pecho? 

                    Pecador, arquitecto en su laberinto 
                    Arquitecto de desgracias 
                    Propias y ajenas, viejas y nuevas. 
                    Engañado por su corazón egoísta 
                    Una petición, miedo y gritos 
                    Lagrimas, piedad y suplicas 
                    Sufre, ya que no las reconoce 

                    Hoy he perdido una flor 
                    La única en mis recuerdos
                    la última`,
        },
        {
            condition: "Ábrela cuando desaparezcas por varios meses",
            content: `Vaya vaya... 
                    Pero miren quien volvío despues de varios meses
                    ¿Cuanto tiempo fue está vez? ¿Mas de 3 meses?
                    Si es así, felicidades, rompiste tu record
                    ¿Se siente bien aparecer de nuevo de forma misteriosa
                    y entre las sombras?
                    Como sea, date prisa y ve a hablarme que seguro te extrañe
                    tonota`,
        },
        {
            condition: "Ábrela cuando sientas que nada tiene sentido",
            content: `Escribe
                    esa es la clave
                    la capacidad de poder expresarnos a travez de palabras
                    es sorprendente ¿Verdad? Y tú lo haces muy bien, 
                    se que te funcionara. Cuando me siento igual
                    utilizo la escritura para desahogarme,
                    ayuda bastante a poner en blanco y negro lo que me atormenta y
                    si no funciona cuentame lo que te pasa en ingles
                    haré lo posible por entender y aconsejarte o distraerte`,
        },
        {
            condition: "Ábrela cuando te den ganas de ignorarme (otra vez)",
            content: `¿Como te atreves? ¿Uh?
                    Debería buscarte y ahorcarte hasta la muerte
                    ¿Apostamos cuánto tiempo duras sin responderme esta vez?
                    No insistire (demasiado), sabes donde encontrarme`,
        }
    ];

    useEffect(() => {
            const resize = () => {
                setIsTable(window.innerWidth < 1000);
            };
            window.addEventListener("resize", resize);
            if(popupLetterBirthday){
                birthdayAudio.currentTime = 0;
                birthdayAudio.play();
                birthdayAudio.volume = 1;
            } else {
                birthdayAudio.pause();
            }
            return () => {
                window.removeEventListener("resize", resize);
            }
        }, [popupLetterBirthday]);
    return (
        <div>
            {isTable?
            (<div className={styles.main_container}>
                <div className={styles.letters_column}>
                    {lettersOfLove.map((item, index) => (
                        <div key={index} className={styles.letter_item}>
                            <div onClick={() => openPopupLetter(item.content, index)} className={styles.letter_content}>
                                <img src={letterImage}></img>
                            </div>
                            <div className={styles.letter_condition}>
                                <div className={styles.letter_circle}/>
                                <h4>{item.condition}</h4>
                                <div className={styles.letter_circle}/>
                            </div>
                        </div>
                    ))}
                </div>
                {popupLetter && createPortal(
                    <motion.div className={styles.popup_overlay} onClick={closePopupLetter}>
                        <motion.div 
                            className={styles.popup_content} 
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0 }} 
                            transition={{ duration: 0.3 }}
                        >
                            <p>{popupLetter}</p>
                    </motion.div>
                </motion.div>,
                document.body
            )}
            </div>)
            :
            (<div className={styles.main_container}>
                <div className={styles.grid_letters}>
                {lettersOfLove.map((item, index) => (
                    <div key={index} className={styles.letter_item}>
                        <div onClick={() => openPopupLetter(item.content, index)} className={styles.letter_content}>
                            <img src={letterImage} className={styles.letter_image}></img>
                        </div>
                        <div className={styles.letter_condition}>
                            <div className={styles.letter_circle}/>
                            <h4>{item.condition}</h4>
                            <div className={styles.letter_circle}/>
                        </div>
                    </div>
                ))}
                </div>
                {popupLetter && createPortal(
                    <motion.div className={styles.popup_overlay} onClick={closePopupLetter}>
                        <motion.div 
                            className={styles.popup_content} 
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0 }} 
                            transition={{ duration: 0.3 }}
                        >
                            <p>{popupLetter}</p>
                    </motion.div>
                </motion.div>,
                document.body
            )}
            </div>)
            }
        </div>
    );
}

export default Letter;
