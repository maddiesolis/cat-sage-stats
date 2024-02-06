import { useEffect, useState } from "react"
import styled from "styled-components"

// TODO: make responsive
const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`
const TitleSpan = styled.div`
    font-family: 'Titan One', sans-serif;
    font-weight: 700;
    font-size: 80px;
    line-height: 90px;
    color: ${(props: any) => props.color || '#264653'};
`
// TODO: make responsive
const StatBoxDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1000px;
    height: 800px;
    border: 1px solid grey;
    border-radius: 4px;
`
// TODO: make responsive
const StyledCanvas = styled.canvas`
    border: 5px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 778px;
    height: 625px;
`

export const StatContainer: React.FC = (props) => {
    const [textColor, setTextColor] = useState('#3498db'); // Initial color

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        // Listen for color updates from the server
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTextColor(data.textColor);
        };

        // Close the WebSocket connection when the component unmounts
        return () => ws.close();
    }, []);
    return (
        <ContainerDiv>
            {/* <TitleSpan color={textColor}>Cat Sage Stats</TitleSpan> */}
            <StyledCanvas>
                animation here
            </StyledCanvas>
        </ContainerDiv>
    )
}