import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Puzz.module.css";

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
    const [isTable, setIsTable] = useState(window.innerWidth < 1000);
    const [currentIndexSwiper, setCurrentIndexSwiper] = useState(0);

    const images = [
        "src/assets/1.png",
        "src/assets/2.png",
        "src/assets/3.png" 
    ];

    useEffect(() => {
        const resize = () => {
            setIsTable(window.innerWidth < 1000);
        };
    
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
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
                            className={styles.puzzle_container} 
                            onMouseEnter={() => swiperRef.current.swiper.allowTouchMove = false}
                            onMouseLeave={() => swiperRef.current.swiper.allowTouchMove = false}
                        >
                            <JigsawPuzzle 
                                imageSrc={image}
                                rows={4}
                                columns={4}
                                onSolved={() => alert(`¡Puzzle ${index + 1} completado!`)}
                            />
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
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
                        <div className={styles.gift}>
                            <ion-icon name="gift"></ion-icon>
                            <div className={styles.lock_closed_icon}>
                                <ion-icon name="lock-closed"></ion-icon>
                                0/3
                            </div>
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
                            onSolved={() => alert(`¡Puzzle ${index + 1} completado!`)}
                        />
                    </div>
                ))}
            </div>)}
            <div>
                <div>
                    <div className={styles.gift}>
                        <ion-icon name="gift"></ion-icon>
                        <div className={styles.lock_closed_icon}>
                            <ion-icon name="lock-closed"></ion-icon>
                            0/3
                        </div>
                    </div>
                </div>
                <SlidingDialog message={"Abreme cuando termines los \nrompecabezas"} duration={4} />
            </div>
        </div>
    );
}

export default Puzzle;