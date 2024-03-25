import MissingStat from './stats/MissingStat';
import AssaultStat from './stats/AssaultStat';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/sexual-assaults" element={<AssaultStat />} />
              <Route path="/missing-children" element={<MissingStat />} />
              {/* Custom redirects */}
              <Route path="/sexual-assaults" element={<Navigate to="/sexual-assaults" />} />
              <Route path="/missing-children" element={<Navigate to="/missing-children" />} />
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;