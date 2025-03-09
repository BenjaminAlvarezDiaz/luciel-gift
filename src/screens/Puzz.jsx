import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Puzz.module.css";
import { motion } from "framer-motion";

import {JigsawPuzzle} from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SlidingDialog from "../components/SlidingDialog/SlidingDialog";

function Puzzle (){
    const swiperRef = useRef(null);
    const puzzleRef = useRef(null);

    const [images, setImages] = useState([]);
    const [popupImage, setPopupImage] = useState(null);

    const [puzzlesSolvedArray, setPuzzlesSolvedArray] = useState([false, false, false]);
    const [puzzlesSolved, setPuzzlesSolved] = useState(0);

    const [congratulationsPopup, setCongratulationsPopup] = useState(false);

    const [isTable, setIsTable] = useState(window.innerWidth < 1000);
    const [currentIndexSwiper, setCurrentIndexSwiper] = useState(0);

    const openPopup = (image) => {
        setPopupImage(image);
    };

    const closePopup = () => {
        setPopupImage(null);
    };

    const puzzleCompleted = (index) => {
        setTimeout(() => {
            setPuzzlesSolvedArray((prev) => {
                if (prev[index]) return prev;
                
                const updated = [...prev];
                updated[index] = true;

                setPuzzlesSolved((prev) => {
                    const solvedCount = prev + 1;
                    if(solvedCount === 3){
                    }
                    return solvedCount;
               });
               return updated;
            });
        }, 0);
    }

    function getRandomNumbers() {
        const numbers = new Set();
        while (numbers.size < 3) {
          numbers.add(Math.floor(Math.random() * 15) + 1);
        }
        const imagePaths = [...numbers].map(i => `src/assets/${i}.png`);
        setImages(imagePaths);

    };

 
      
    //console.log(getRandomNumbers()); // Ejemplo: [3, 12, 7]

    useEffect(() => {
        const resize = () => {
            setIsTable(window.innerWidth < 1000);
        };
        const handleTouchMove = (e) => {
            if (puzzleRef.current && puzzleRef.current.contains(e.target)) {
              e.preventDefault(); // Evita el desplazamiento táctil
            }
        };
    
        window.addEventListener("resize", resize);
        document.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("resize", resize);
            document.removeEventListener("touchmove", handleTouchMove);
            getRandomNumbers();
        };
      }, []);

    return (
        <div>
            {isTable? 
            (<div className={styles.main_container}>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: `.${styles.custom_next}`,
                        prevEl: `.${styles.custom_prev}`,
                    }}
                    spaceBetween={50}
                    slidesPerView={1}
                    style={{ width: "320px", height: "360px"}}
                    onSlideChange={(index) => {setCurrentIndexSwiper(index.activeIndex);}}
                >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <div 
                            ref={puzzleRef}
                            className={styles.puzzle_container} 
                            onMouseEnter={() => swiperRef.current.swiper.allowTouchMove = false}
                            onMouseLeave={() => swiperRef.current.swiper.allowTouchMove = false}
                        >
                            <JigsawPuzzle 
                                imageSrc={image}
                                rows={4}
                                columns={4}
                                onSolved={() => {puzzleCompleted(index); console.log(puzzlesSolved);}}
                            />
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
                <div 
                    className={styles.tap_view_image} 
                    onClick={() => openPopup(images[currentIndexSwiper])}
                >
                    Toca para ver la imagen
                </div>
                {popupImage && (
                    <motion.div 
                        className={styles.popup_overlay} 
                        onClick={closePopup}
                    >
                    <motion.div className={styles.popup_content} onClick={(e) => e.stopPropagation()}>
                        <motion.img 
                            src={popupImage} 
                            alt="Imagen completa"
                            className={styles.popup_image} 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0 }} 
                            transition={{ duration: 0.3 }}
                        />
                        <span className={styles.close_button} onClick={closePopup}><ion-icon name="close"></ion-icon></span>
                    </motion.div>
                    </motion.div>
        )}
                <div className={styles.custom_swiper_buttons}>
                    <div className={`${styles.custom_prev}`} 
                        style={{ opacity: currentIndexSwiper === 0 ? 0.2 : 1 }}><ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                    <div className={`${styles.custom_next}`} 
                        style={{ opacity: currentIndexSwiper === images.length - 1 ? 0.2 : 1 }}><ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </div>
                <div>
                    <div>
                        <div className={styles.gift} onClick={() => puzzlesSolved === 3 && setCongratulationsPopup(true)}>
                            <ion-icon name="gift"></ion-icon>
                            <motion.div
                                initial={{ scale: 1 }}
                                animate={{ scale: puzzlesSolved ===3 ? 0 : 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className={styles.lock_closed_icon}>
                                <ion-icon name="lock-closed"></ion-icon>
                                {puzzlesSolved}/3
                        </motion.div>
                        </div>
                    </div>
                    <SlidingDialog message={"Abreme cuando termines los \nrompecabezas"} duration={4} />
                </div>
            </div>) 
            : 
            (<div className={styles.main_container}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={styles.puzzle_container} 
                    >
                        <JigsawPuzzle 
                            imageSrc={image}
                            rows={4}
                            columns={4}
                            onSolved={() => {puzzleCompleted(index); console.log(puzzlesSolved);}}
                        />
                    </div>
                ))}
            </div>
        )}
            <div>
                <div>
                    <div className={styles.gift} onClick={() => puzzlesSolved === 3 && setCongratulationsPopup(true)}>
                        <ion-icon name="gift"></ion-icon>
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: puzzlesSolved ===3 ? 0 : 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className={styles.lock_closed_icon}>
                            <ion-icon name="lock-closed"></ion-icon>
                            {puzzlesSolved}/3
                        </motion.div>
                    </div>
                </div>
                <SlidingDialog message={"Abreme cuando termines los \nrompecabezas"} duration={4} />
            </div>
            {congratulationsPopup && (
                <div className={styles.congratulationsPopup}>
                    <div className={styles.congratulationsPopupContent}>
                        <h2>Felicidades!</h2>
                        <h2>Terminaste los puzzles</h2>
                        <button onClick={() => setCongratulationsPopup(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Puzzle;