import * as React from 'react';
import SketchBoard from 'components/SketchBoard';
import { Container, Div } from './styles';

const App: React.SFC<{}> = () => (
  <Container>
    <Div>
      <SketchBoard />
    </Div>
  </Container>
);

export default App;
