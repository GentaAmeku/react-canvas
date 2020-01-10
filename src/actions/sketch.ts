import { default as actionCreatorFactory } from 'typescript-fsa';

export interface CanvasChangeActionPayload {
  color?: string;
  lineWidth?: number;
  isDrawingMode?: boolean;
  presentCanvasHistory?: fabric.Object[];
  sketchType?: SketchType;
}

export enum SketchTypes {
  Pencil = 'Pencil',
  Circle = 'Circle',
}

export type SketchType = SketchTypes;

const actionCreator = actionCreatorFactory();

export const actions = {
  changeColor: actionCreator<CanvasChangeActionPayload>('CHANGE_COLOR'),
  changeLineWidth: actionCreator<CanvasChangeActionPayload>(
    'CHANGE_LINE_WIDTH',
  ),
  changeDrawingMode: actionCreator<CanvasChangeActionPayload>(
    'CHANGE_DRAWING_MODE',
  ),
  changeSketchType: actionCreator<CanvasChangeActionPayload>(
    'CHANGE_SKETCH_TYPE',
  ),
  updateCanvasHisotry: actionCreator<CanvasChangeActionPayload>(
    'UPDATE_CANVAS_HISTORY',
  ),
  undoCanvasHistory: actionCreator<CanvasChangeActionPayload>(
    'UNDO_CANVAS_HISTORY',
  ),
  redoCanvasHistory: actionCreator<CanvasChangeActionPayload>(
    'REDO_CANVAS_HISTORY',
  ),
};
