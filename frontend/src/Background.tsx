import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import test_background from './test_background.png'

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

const spriteWidth = 2000;
const spriteHeight = 2000;
const staggerFrames = 5;            // animation speed

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
   
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; 
        const ctx = canvas.getContext('2d');
        const CANVAS_WIDTH = canvas.width = 2000;
        const CANVAS_HEIGHT = canvas.height = 2000;

        const playerImage = new Image();
        playerImage.src = test_background;

        let gameFrame = 0;

        playerImage.onload = () => {
            const animate = () => {
                ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                const position = Math.floor(gameFrame / staggerFrames) % 13; // 13 different frames in the animation
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
