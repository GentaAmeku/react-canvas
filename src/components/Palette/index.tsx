import * as React from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { SketchTypes, SketchType } from 'actions/sketch';
import { ColorPaletteWrap } from './styles';

export interface PaletteProps {
  color: string;
  changeColor: (color: string) => void;
  changeLineWidth: (lineWidth: number) => void;
  changeDrawingMode: (isDrawingMode: boolean) => void;
  changeSketchType: (sketchType: SketchType) => void;
  undoCanvasHistory: () => void;
  redoCanvasHistory: () => void;
}

const colors = [
  '#000000',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
];

const Palette: React.SFC<PaletteProps> = ({
  color,
  changeColor,
  changeLineWidth,
  changeDrawingMode,
  changeSketchType,
  undoCanvasHistory,
  redoCanvasHistory,
}) => {
  const handleChangeColorPicker = (color: ColorResult) =>
    changeColor(color.hex);
  const handleChangeLineWidth = (lineWidth: number) => () =>
    changeLineWidth(lineWidth);
  const handleChangeDrawingMode = (isDrawingMode: boolean) => () =>
    changeDrawingMode(isDrawingMode);
  const handleChangeSketchTypeMutates = () =>
    changeSketchType(SketchTypes.Pencil);
  const handleUndo = () => undoCanvasHistory();
  const handleRedo = () => redoCanvasHistory();
  return (
    <React.Fragment>
      <div>Palette</div>
      <ColorPaletteWrap>
        <CirclePicker
          colors={colors}
          color={color}
          width="100%"
          onChangeComplete={handleChangeColorPicker}
        />
      </ColorPaletteWrap>
      <button onClick={handleChangeDrawingMode(true)}>Enabled</button>
      <button onClick={handleChangeDrawingMode(false)}>Disabled</button>
      <button onClick={handleChangeLineWidth(10)}>Change LineWidth 10</button>
      <button onClick={handleChangeLineWidth(1)}>Change LineWidth 1</button>
      <button onClick={handleChangeSketchTypeMutates}>Change Sketch</button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </React.Fragment>
  );
};

export default Palette;
