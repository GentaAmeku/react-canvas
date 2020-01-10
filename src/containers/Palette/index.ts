import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { compose, setDisplayName, pure } from 'recompose';
import Palette, { PaletteProps } from 'components/Palette';
import { CanvasChangeActionPayload, SketchType } from 'actions/sketch';
import actions from 'actions';
import { State } from 'reducers';

interface DispatchProps {
  changeColor: (color: string) => void;
  changeLineWidth: (lineWidth: number) => void;
  changeDrawingMode: (isDrawingMode: boolean) => void;
  changeSketchType: (sketchType: SketchType) => void;
  undoCanvasHistory: () => void;
  redoCanvasHistory: () => void;
}

interface StateProps {
  color?: string;
}

const mapStateToProps = (state: State) => ({
  color: state.canvasSettings.color,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<CanvasChangeActionPayload>>,
): DispatchProps => {
  const {
    changeColor,
    changeLineWidth,
    changeDrawingMode,
    changeSketchType,
    undoCanvasHistory,
    redoCanvasHistory,
  } = actions;
  return bindActionCreators(
    {
      changeColor: (color: string) => changeColor({ color }),
      changeLineWidth: (lineWidth: number) => changeLineWidth({ lineWidth }),
      changeDrawingMode: (isDrawingMode: boolean) =>
        changeDrawingMode({ isDrawingMode }),
      changeSketchType: (sketchType: SketchType) =>
        changeSketchType({ sketchType }),
      undoCanvasHistory: () => undoCanvasHistory({}),
      redoCanvasHistory: () => redoCanvasHistory({}),
    },
    dispatch,
  );
};

const echance = compose(
  setDisplayName('WithPalette'),
  connect<StateProps, DispatchProps, PaletteProps>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  pure,
);

export default echance(Palette);
