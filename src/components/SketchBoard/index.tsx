import * as React from 'react';
import FabricCanvas from 'containers/FabricCanvas';
import Palette from 'containers/Palette';
import UsersWithRank from 'containers/UsersWithRank';

export interface SketchBoardProps {}

const SketchBoardProps: React.SFC<SketchBoardProps> = () => {
  return (
    <React.Fragment>
      <div>Sketch</div>
      <FabricCanvas />
      <Palette />
      <UsersWithRank />
    </React.Fragment>
  );
};

export default SketchBoardProps;
