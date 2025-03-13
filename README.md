# Cat Sage Stats
Developed in March, 2024.

## Tech Stack
**Frontend**: React app using Typescript

**Server**: Node.js with Express

## Concept
Visualization of frequency of sexual assault against women. The site is a simulation of receiving real-time data and reflecting that data visually. Every time a hand touches the moon/figure, a woman is sexually assaulted. As there is no live data recorded for this statistic, I approximated the frequency using known statistics (detailed below).

## Statistics
- Est. global female population: 3.8 billion (United Nations, 2022)
- Est. number of women affected: 1/3 * 3.8 billion = 1.27 billion (WHO)
- Est. annual occurences: 1.27 billion / avg. life exp. 75 year = 16.9 million occurences per year (WHO)
- Freq per day: 16.9 million / 365 days = 46,301 occurences per day
- Freq per hour: 46,301 / 24 hours = 1929 occurences per hour
- Freq per minute: 1929 / 60 minutes = 32 occurences per minute

## Implementation
**Frontend**: Spritesheet animations (one spritesheet for the background and another for the foreground)
- 6 different foreground options (hand animations)
- Server updates dictate which hand is animated (e.g. if 'hand1' is received from server, that animation is played once, then canvas resumes to being empty until a new update is received)

**Server:** Randomized updates
- Sends approximately 32 updates per minute (to reflect statistic)
- Time intervals are randomized but within a set range of seconds
- Each update is a string representing one of the 6 different hand animations
- Each update is randomized
- Ensures that the same update is not sent twice in a row (e.g. 'hand1' is not sent consecutively)

## Artwork
The artwork displayed is a combination of digital collage and illustration. It is a visual metaphor that represents the frequency of sexual assaults against women, globally. The moon and female figure represent an interpretation of the divine feminine. The figure is an appropriation of 'Selene' by Albert Aublet (1880), a historical personification of the moon goddess Selene. I chose these classical symbols for femininity as a way to allow viewers to understand the piece with more immediacy. The animated hands are a direct representation of the divine feminine being "manhandled".
- Photograph of the moon was taken by me
- Figure on moon is an appropriation of 'Selene' by Albert Aublet
- Hands animations are a combination of found images and my own photographs
- Edited in PhotoShop and animated in Clip Studio Paint
- Spritesheets created in PhotoShop
