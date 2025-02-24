import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Puzz.module.css";

import {JigsawPuzzle} from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Puzzle (){

    const swiperRef = useRef(null);
    const [isTable, setIsTable] = useState(window.innerWidth < 1000);

    const images = [
        "src/assets/1.png",
        "src/assets/2.jpg",
        "src/assets/3.jpg" 
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
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    style={{ width: "300px", height: "340px" }}
                >
                {images.map((image, index) => (
                    <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
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
            </div>) 
            : 
            (<div className={styles.main_container}>
                {images.map((image, index) => (
                    <div 
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
        </div>
    );
}

export default Puzzle;