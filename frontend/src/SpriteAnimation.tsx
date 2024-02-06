import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import shadow_dog from './shadow_dog.png'

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

interface Frame {
    x: number;
    y: number;
}

interface SpriteProps {
    playerState: string;
}

export const Sprite: React.FC<SpriteProps> = ({ playerState }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
   
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !playerState) return; 
        const ctx = canvas.getContext('2d');
        const CANVAS_WIDTH = canvas.width = 600;
        const CANVAS_HEIGHT = canvas.height = 600;

        const playerImage = new Image();
        playerImage.src = shadow_dog;

        const spriteWidth = 575;        // sheet width / number of rows  
        const spriteHeight = 523;       // sheet height / number of cols

        let gameFrame = 0;
        const staggerFrames = 5;        // animation speed

        const spriteAnimations: { [key: string]: { loc: Frame[] }} = {};
        const animationStates = [
            {
                name: 'idle',
                frames: 7
            },
            {
                name: 'jump',
                frames: 7
            },
            {
                name: 'fall',
                frames: 7
            }
        ]
        animationStates.forEach((state, index) => {
            let frames: {loc: Frame[]} = {
                loc: []
            }
            for (let j = 0; j < state.frames; j++) {
                let positionX = j * spriteWidth;
                let positionY = index * spriteHeight;
                frames.loc.push({x: positionX, y: positionY});
            }
            spriteAnimations[state.name] = frames;
        })

        playerImage.onload = () => {
            const animate = () => {
                ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;     // cycle through horizontal animation
                let frameX = spriteWidth * position;                        // frame within one animation row
                let frameY = spriteAnimations[playerState].loc[position].y;      // animation row (incrementing will give you a different animation)
                ctx?.drawImage(
                    playerImage, 
                    frameX, frameY,                  // Current frame
                    spriteWidth, spriteHeight,                      // Frame size
                    0, 0,                                           // Placement on canvas
                    spriteWidth, spriteHeight                       // Size on canvas
                );                     
                gameFrame++;
                requestAnimationFrame(animate);
            };
            animate();
        };
    }, [playerState]);
    return (
        <StyledCanvas ref={canvasRef}/>
    )
}