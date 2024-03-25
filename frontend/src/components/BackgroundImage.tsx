import React, { useEffect, useRef } from "react";
import styled from "styled-components";

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
`;

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
    }, [imageUrl, canvasWidth, canvasHeight]); // Dependencies

    return <StyledCanvas ref={canvasRef} />;
};