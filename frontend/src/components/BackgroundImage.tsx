import React, { useEffect, useRef } from "react";
import { StyledCanvas } from "./BackgroundAnimation";

interface BackgroundImageProps {
    imageUrl: string; // Image URL for the background
    canvasWidth: number;
    canvasHeight: number;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ imageUrl, canvasWidth, canvasHeight }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d');

        const backgroundImage = new Image();
        backgroundImage.src = imageUrl;

        backgroundImage.onload = () => {
            ctx?.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
        };
    }, [imageUrl, canvasWidth, canvasHeight]);

    return <StyledCanvas ref={canvasRef} />;
};