import React, { useEffect, useRef } from "react"
import styled from "styled-components"

export const StyledCanvas = styled.canvas`
    position: absolute;
    top: 4.5rem;
    width: 700px;
    height: 700px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;

    @media (min-width: 1600px) {
        top: 7rem;
    }
    @media (max-width: 800px) {
        width: 500px;
        height: 500px;
    }
    @media (max-width: 600px) {
        width: 300px;
        height: 300px;
    }
`

interface BackgroundAnimationProps {
    spriteWidth: number;
    spriteHeight: number;
    staggerFrames: number;
    animationSheet: string;
    canvasWidth: number;
    canvasHeight: number;
    numFrames: number;
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ spriteWidth, spriteHeight, staggerFrames, animationSheet, canvasWidth, canvasHeight, numFrames}) => {
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
    });
    return (
        <StyledCanvas ref={canvasRef}/>
    )
}