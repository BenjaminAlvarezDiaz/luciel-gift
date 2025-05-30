import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Puzz.module.css";
import "../styles/Puzz.module.css";
import { motion } from "framer-motion";
import jigsawGiftAudio from "../assets/jigsawScreen/gift.ogg";

import {JigsawPuzzle} from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SlidingDialog from "../components/SlidingDialog/SlidingDialog";

const jigsawGift = new Audio(jigsawGiftAudio);

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

    const openCongratulationsPopup = () => {
        setCongratulationsPopup(true);
        jigsawGift.currentTime = 0;
        jigsawGift.play();
        jigsawGift.volume = 1;
    }

    const closeCongratulationsPopup = () => {
        jigsawGift.pause();
        setCongratulationsPopup(false);
    }

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

    const imgImport = import.meta.glob('/*.png'); 

    function getRandomNumbers() {
        const numbers = new Set();
        while (numbers.size < 3) {
          numbers.add(Math.floor(Math.random() * 15) + 1);
        }
        const imagePaths = [...numbers].map(i => `/${i}.png`);
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
        getRandomNumbers();
        
        if(congratulationsPopup){
            jigsawGift.currentTime = 0;
            jigsawGift.play();
        } else {
            jigsawGift.pause();
        }

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
                        <div className={styles.gift} onClick={() => puzzlesSolved === 3 && openCongratulationsPopup()}>
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
                        <div className={styles.puzzle}>
                            <JigsawPuzzle 
                                imageSrc={image}
                                rows={4}
                                columns={4}
                                onSolved={() => {puzzleCompleted(index); console.log(puzzlesSolved);}}
                            />
                        </div>
                        <div 
                            className={styles.tap_view_image} 
                            onClick={() => openPopup(images[index])}
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
                    </div>
                ))}
            </div>
        )}
            <div>
                <div>
                    <div className={styles.gift} onClick={() => puzzlesSolved === 3 && openCongratulationsPopup()}>
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
                <div className={styles.congratulationsPopup} onClick={closeCongratulationsPopup}>
                    <div className={styles.congratulationsPopupContent} onClick={(e) => e.stopPropagation()}>
                        <h2>¡Felicidades!</h2>
                        <h2>Terminaste los puzzles, escucha un momento</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Puzzle;