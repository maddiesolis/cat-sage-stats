import React, { useEffect, useRef } from "react"
import { StyledCanvas } from "./BackgroundAnimation";
interface Frame {
    x: number;
    y: number;
}
interface AnimationStateProps {
    name: string,
    frames: number
}
interface SpriteAnimationProps {
    playerState: string;
    spriteSheet: string;
    spriteWidth: number;
    spriteHeight: number;
    staggerFrames: number;
    canvasWidth: number;
    canvasHeight: number;
    onAnimationEnd?: () => void;
    animationStates: AnimationStateProps[];
}
export const SpriteAnimation: React.FC<SpriteAnimationProps> = ({ 
    playerState, 
    spriteSheet, 
    spriteWidth, 
    spriteHeight, 
    staggerFrames, 
    canvasWidth,
    canvasHeight,
    onAnimationEnd,
    animationStates
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
   
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || playerState === 'none') return; 
        const ctx = canvas.getContext('2d');
        const CANVAS_WIDTH = canvas.width = canvasWidth;
        const CANVAS_HEIGHT = canvas.height = canvasHeight;
        const playerImage = new Image();
        playerImage.src = spriteSheet;
        let gameFrame = 0;
        const spriteAnimations: { [key: string]: { loc: Frame[] }} = {};
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
                if (gameFrame >= staggerFrames * spriteAnimations[playerState].loc.length) {
                    if (onAnimationEnd) {
                        onAnimationEnd(); // Call onAnimationEnd callback if provided
                    }
                    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                    return; // Stop animation & clear canvas when it reaches end of sequence
                }
                
                ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;     // cycle through horizontal animation
                let frameX = spriteWidth * position;                            // frame within one animation row
                let frameY = spriteAnimations[playerState].loc[position].y;     // animation row (incrementing will give you a different animation)
                ctx?.drawImage(
                    playerImage, 
                    frameX, frameY,                  // Current frame
                    spriteWidth, spriteHeight,       // Frame size
                    0, 0,                            // Placement on canvas
                    spriteWidth, spriteHeight        // Size on canvas
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