import { fabric } from 'fabric';
import { set } from 'lodash';
import { SketchType, SketchTypes } from 'actions/sketch';

export const CANVAS_ID = 'canvas';
export const fabricDefaultSettings = {
  color: '#000000',
  lineWidth: 10,
  isDrawingMode: true,
  selection: false,
};

export type CanvasType = {
  freeDrawingBrush: fabric.PencilBrush;
} & fabric.Canvas;

export const isInstanceOfFabricCanvas = (
  canvas: CanvasType | {},
): canvas is fabric.Canvas => canvas instanceof fabric.Canvas;

export const initFabricCanvas = (id: string) =>
  new fabric.Canvas(id, { ...fabricDefaultSettings });

export const changeColorMutates = (
  canvas: CanvasType,
  color: string = fabricDefaultSettings.color,
) => set(canvas, 'freeDrawingBrush.color', color);

export const changeLineWidthMutates = (
  canvas: CanvasType,
  lineWidth: number = fabricDefaultSettings.lineWidth,
) => set(canvas, 'freeDrawingBrush.width', lineWidth);

export const changeDrawingModeMutates = (
  canvas: CanvasType,
  isDrawingMode: boolean = fabricDefaultSettings.isDrawingMode,
) => set(canvas, 'isDrawingMode', isDrawingMode);

export const replaceCanvasObjectsMutates = (
  canvas: CanvasType,
  objects: fabric.Object[],
) => (canvas._objects = [...objects]);

export const changeSketchTypeMutates = (
  canvas: CanvasType | {},
  sketchType: SketchType = SketchTypes.Pencil,
) => {
  if (!isInstanceOfFabricCanvas(canvas)) {
    return canvas;
  }
  switch (sketchType) {
    case SketchTypes.Pencil: {
      canvas.freeDrawingBrush = new fabric.PencilBrush();
      break;
    }
    default: {
      break;
    }
  }
  return canvas;
};
