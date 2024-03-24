import styled from 'styled-components';
import AnotherStat from './stats/AnotherStat';
import AssaultStat from './stats/AssaultStat';

const TestLayoutDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 300px;
`

function App() {
  return (
    <TestLayoutDiv>
      <AssaultStat/>
      <AnotherStat/>
    </TestLayoutDiv>
  );
}

export default App;