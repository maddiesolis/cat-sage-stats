import React, { useState, useEffect } from 'react';
import { StatContainer } from './StatContainer';
import styled from 'styled-components';

// TODO: make responsive
const PageContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

function App() {
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
    <PageContainerDiv>
      {/* <span style={{ fontWeight: '800', fontSize: '100px', color: textColor }}>
          Cat Sage Stats
      </span> */}
      
      <StatContainer/>
    </PageContainerDiv>
  );
}

export default App;
