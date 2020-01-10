import * as React from 'react';

export interface CanvasProps {
  id: string;
  width: string;
  height: string;
}

const Canvas: React.SFC<CanvasProps> = ({ id, width, height }) => (
  <canvas id={id} width={width} height={height} />
);

export default Canvas;
