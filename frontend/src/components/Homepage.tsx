import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button as ChakraButton, useMediaQuery, Text, Heading, Box } from '@chakra-ui/react'
import '@fontsource-variable/dm-sans';
import '@fontsource/lilita-one';

const HomepageButton: React.FC<{children: React.ReactNode }> = ({ children }) => {
    const [reachedMinBreakPoint] = useMediaQuery('(max-width: 600px)');
    return (
        <ChakraButton
            borderRadius='full'
            size={reachedMinBreakPoint ? 'md' : 'lg'}
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
    const [reachedMinBreakPoint] = useMediaQuery('(max-width: 600px)');
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2rem"
            height="100vh"
            fontFamily="'DM Sans Variable', sans-serif"
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent={reachedMinBreakPoint ? "start" : "space-between"}
                height={reachedMinBreakPoint ? "100%" : "60%"}
                gap={reachedMinBreakPoint ? "3rem" : "0"}
                paddingTop={reachedMinBreakPoint ? "6rem" : "0"}
                width="fit-content"
            >
                <Heading
                    fontFamily="'Lilita One', system-ui"
                    fontSize={reachedMinBreakPoint ? '40px' : '60px'}
                    color="#1c557c"
                >
                    CAT SAGE STATS
                </Heading>
                <Text 
                    width={reachedMinBreakPoint ? '350px' : '500px'} 
                    textAlign="center" 
                    fontSize={reachedMinBreakPoint ? 'md' : 'lg'} 
                    color="#1f2d36"
                >
                    The purpose of this website is to visualise important 
                    data in meaningful ways. In general, it is difficult for 
                    humans to comprehend statistics in the form of numbers, and 
                    common graphical approaches require a learning curve or 
                    technical expertise in order to be understood. The 
                    visualisation methods presented below intend to humanise 
                    the given statistics, in hopes that the viewer can gain a 
                    genuine understanding of the reality behind these numbers.
                </Text>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    gap={reachedMinBreakPoint ? '1rem' : '2rem'}
                >
                    <ChakraLink as={ReactRouterLink} to="/sexual-assaults">
                        <HomepageButton>
                            Frequency of Sexual Assaults Against Women
                        </HomepageButton>
                    </ChakraLink>
                    <ChakraLink as={ReactRouterLink} to="/missing-children">
                        <HomepageButton>
                            Frequency of Child Disappearances
                        </HomepageButton>
                    </ChakraLink>
                </Box>
            </Box>
        </Box>
    )
}