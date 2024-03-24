import styled from 'styled-components';
import AnotherStat from './stats/AnotherStat';
import AssaultStat from './stats/AssaultStat';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';

const TestLayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 300px;
`

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/sexual-assaults" element={<AssaultStat />} />
            <Route path="/another" element={<AnotherStat />} />
            {/* Custom redirects */}
            <Route path="/sexual-assaults" element={<Navigate to="/sexual-assaults" />} />
            <Route path="/another" element={<Navigate to="/another" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;