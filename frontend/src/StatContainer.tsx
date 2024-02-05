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
    color: #264653;
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
export const StatContainer: React.FC = (props) => {
    return (
        <ContainerDiv>
            <TitleSpan>Cat Sage Stats</TitleSpan>
            <StatBoxDiv>animation here</StatBoxDiv>
        </ContainerDiv>
    )
}