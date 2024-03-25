import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import styled from "styled-components";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 100vh;
`

export default function Homepage() {
    return (
        <PageContainer>
            <ChakraLink as={ReactRouterLink} to='/sexual-assaults'>
                Sexual Assault Occurences Against Women
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to='/missing-children'>
                Missing Children
            </ChakraLink>
        </PageContainer>
    )
}