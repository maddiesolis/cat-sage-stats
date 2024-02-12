import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const StyledCanvas = styled.canvas`
    border: 5px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;

    @media (max-width: 600px) {
        width: 300px;
        height: 300px;
    }
`

interface BackgroundProps {
    spriteWidth: number;
    spriteHeight: number;
    staggerFrames: number;
    animationSheet: string;
    canvasWidth: number;
    canvasHeight: number;
    numFrames: number;
}

const Background: React.FC<BackgroundProps> = ({ spriteWidth, spriteHeight, staggerFrames, animationSheet, canvasWidth, canvasHeight, numFrames}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
   
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; 
        const ctx = canvas.getContext('2d');
        const CANVAS_WIDTH = canvas.width = canvasWidth;
        const CANVAS_HEIGHT = canvas.height = canvasHeight;

        const playerImage = new Image();
        playerImage.src = animationSheet;

        let gameFrame = 0;

        playerImage.onload = () => {
            const animate = () => {
                ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                const position = Math.floor(gameFrame / staggerFrames) % numFrames; // 13 different frames in the animation
                const frameX = spriteWidth * position; // Frame within one animation row
                const frameY = 0;               // No vertical offset
                ctx?.drawImage(
                    playerImage, 
                    frameX, frameY,             // Current frame
                    spriteWidth, spriteHeight,  // Frame size
                    0, 0,                       // Placement on canvas
                    spriteWidth, spriteHeight   // Size on canvas
                );                     
                gameFrame++;
                requestAnimationFrame(animate);
            };
            animate();
        };
    }, []);
    return (
        <StyledCanvas ref={canvasRef}/>
    )
}

export default Background;
