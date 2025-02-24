import React from "react";
import styles from "../styles/Puzz.module.css";

import {JigsawPuzzle} from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";


function Puzzle (){



    return (
        <div className={styles.main_container}>
            <div className={styles.puzzle_container}>
                <JigsawPuzzle 
                    imageSrc="src/assets/1.png" 
                    rows={4}
                    columns={4}
                    onSolved={() => alert("Solved!")}
                />
            </div>
            <div className={styles.puzzle_container}>
                <JigsawPuzzle 
                    imageSrc="src/assets/2.jpg" 
                    rows={4}
                    columns={4}
                    onSolved={() => alert("Solved!")}
                />
            </div>
            <div className={styles.puzzle_container}>
                <JigsawPuzzle 
                    imageSrc="src/assets/3.jpg" 
                    className={styles.puzzle}
                    rows={4}
                    columns={4}
                    onSolved={() => alert("Solved!")}
                />
            </div>
        </div>
    );
}

export default Puzzle;