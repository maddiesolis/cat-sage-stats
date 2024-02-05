// Remove the import statement for 'websocket' and replace it with:
// import { w3cwebsocket as WebSocket } from 'websocket';
import React, { useState, useEffect } from 'react';

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontWeight: '800', fontSize: '100px', color: textColor }}>
              Cat Sage Stats
          </span>
      </div>
  );
}

export default App;
