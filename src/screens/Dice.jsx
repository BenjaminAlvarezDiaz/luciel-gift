import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Dice.module.css";
import { motion } from "framer-motion";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

function Box(props) {
    const ref = useRef();
    const [rotation, setRotation] = useState([0, 0, 0]); // Rotación final
    const [isRolling, setIsRolling] = useState(false); // Indica si el dado está en movimiento
    const [elapsedTime, setElapsedTime] = useState(0); // Tiempo transcurrido
    //useFrame((state, delta) => (ref.current.rotation.y += delta));

    const phrases = [
        "Gira el dado tonota", 
        `Mi naturaleza es 
        un poco edgy`, 
        "Perro cyberpunk", 
        "CORN ITS ALWAYS CORN", 
        ":table:", 
        ":monkey:"
    ];

    const rollDice = () => {
        if (isRolling) return; // Evita múltiples clics durante la animación

        setIsRolling(true);
        setElapsedTime(0);

        const randomRotation = [
            (Math.floor(Math.random() * 4) + 1) * (3.14 / 2), // Rotación en X
            (Math.floor(Math.random() * 4) + 1) * (3.14 / 2), // Rotación en Y
            0 // Mantener Z en 0
        ];
        setRotation(randomRotation);
    };

    useFrame((state, delta) => {
        if (isRolling) {
            setElapsedTime((prev) => Math.min(prev + delta / 4, 2));

            ref.current.rotation.x += (rotation[0] - ref.current.rotation.x) * delta * 2;
            ref.current.rotation.y += (rotation[1] - ref.current.rotation.y) * delta * 2;
            ref.current.rotation.z += (rotation[2] - ref.current.rotation.z) * delta * 2;

            

            if (elapsedTime >= 1) {
                ref.current.rotation.x = rotation[0];
                ref.current.rotation.y = rotation[1];
                ref.current.rotation.z = rotation[2];
                setIsRolling(false);
            }
        }
    });
    return (
        <mesh
            {...props}
            ref={ref}
            onClick={rollDice}
        >
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color={'pink'} />

            <Text position={[0, 0, 0.76]} fontSize={0.15} color="#333333">
                {phrases[0]}
            </Text>
            <Text position={[0, 0, -0.76]} rotation={[0, Math.PI, 0]} fontSize={0.15} color="#333333">
                {phrases[1]}
            </Text>
            <Text position={[0.76, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.15} color="#333333">
                {phrases[2]}
            </Text>
            <Text position={[-0.76, 0, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.12} color="#333333">
                {phrases[3]}
            </Text>
            <Text position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.15} color="#333333">
                {phrases[4]}
            </Text>
            <Text position={[0, -0.76, 0]} rotation={[Math.PI / 2, 0, 0]} fontSize={0.15} color="#333333">
                {phrases[5]}
            </Text>
        </mesh>
    );
}

function Dice (){
    return (
        <div className={styles.main_container}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box position={[0, 1, 0]} />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default Dice;