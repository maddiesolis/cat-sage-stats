import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button as ChakraButton, useMediaQuery, Text, Heading, Box } from '@chakra-ui/react'
import styled from "styled-components";
import '@fontsource-variable/dm-sans';
import '@fontsource/blackout-sunrise';
import '@fontsource/bowlby-one-sc';
import '@fontsource/lilita-one';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 100vh;
    font-family: 'DM Sans Variable', sans-serif;
`
const PageContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 60%;
    width: fit-content;
`

const HomepageButton: React.FC<{children: React.ReactNode }> = ({ children }) => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
    return (
        <ChakraButton
            borderRadius='full'
            size={isLargerThan800 ? 'lg' : 'md'}
            fontWeight='600'
            color='#223038'
            backgroundColor={'#eff0f1'}
            _hover={{ bg: '#e6e7e9' }}
        >
            {children}
        </ChakraButton>
    )
}

export default function Homepage() {
    return (
        <PageContainer>
            <PageContents>
                <Heading
                    fontFamily='Lilita One, system-ui'
                    fontSize='80px'
                    color='#1c557c'
                >
                    CAT SAGE STATS
                </Heading>
                <Text width='500px' textAlign='center' fontSize='lg' color='#1f2d36'>
                    The purpose of this website is to visualise important 
                    data in meaningful ways. In general, it is difficult for 
                    humans to comprehend statistics in the form of numbers, and 
                    common graphical approaches require a learning curve or 
                    technical expertise in order to be understood. The 
                    visualisation methods presented below intend to humanise 
                    the given statistics, in hopes that the viewer can gain a 
                    genuine understanding of the reality behind these numbers.
                </Text>
                <Box display='flex' flexDirection='column' alignItems='center' gap='2rem'>
                    <ChakraLink as={ReactRouterLink} to='/sexual-assaults'>
                        <HomepageButton>
                            Frequency of Sexual Assaults Against Women
                        </HomepageButton>
                    </ChakraLink>
                    <ChakraLink as={ReactRouterLink} to='/missing-children'>
                        <HomepageButton>
                            Frequency of Child Disappearances
                        </HomepageButton>
                    </ChakraLink>
                </Box>
            </PageContents>
        </PageContainer>
    )
}