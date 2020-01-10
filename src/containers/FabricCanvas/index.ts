import { IEvent } from 'fabric/fabric-impl';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  compose,
  lifecycle,
  withStateHandlers,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  pure,
} from 'recompose';
import { State, CanvasHistory } from 'reducers';
import actions from 'actions';
import { CanvasChangeActionPayload } from 'actions/sketch';
import {
  CANVAS_ID,
  CanvasType,
  isInstanceOfFabricCanvas,
  initFabricCanvas,
  changeColorMutates,
  changeDrawingModeMutates,
  replaceCanvasObjectsMutates,
  changeLineWidthMutates,
} from 'lib/fabric';
import Canvas, { CanvasProps } from 'components/Canvas';

interface LStateProps {
  canvas: CanvasType | {};
  shouldAddEvents: boolean;
}

interface StateProps {
  color?: string;
  lineWidth: number;
  isDrawingMode?: boolean;
  canvasHistory: CanvasHistory;
}

interface DispatchProps {
  updateCanvasHisotry: (canvasHisotry: fabric.Object[]) => void;
}

type LStateHandlerProps = {
  initFabricCanvas: (id: string) => StateHandler<{}>;
} & StateHandlerMap<LStateProps>;

type EnhancedFabricCanvasProps = StateProps &
  DispatchProps &
  CanvasProps &
  LStateProps &
  LStateHandlerProps;

const defaultCanvasState = { id: CANVAS_ID, width: '600', height: '600' };

const mapStateToProps = (state: State): StateProps => ({
  color: state.canvasSettings.color,
  lineWidth: state.canvasSettings.lineWidth,
  isDrawingMode: state.canvasSettings.isDrawingMode,
  canvasHistory: state.canvasHistory,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<CanvasChangeActionPayload>>,
) => {
  const { updateCanvasHisotry } = actions;
  return bindActionCreators(
    {
      updateCanvasHisotry: (presentCanvasHistory: fabric.Object[]) =>
        updateCanvasHisotry({ presentCanvasHistory }),
    },
    dispatch,
  );
};

const enhance = compose(
  setDisplayName('WithFabricCanvas'),
  withStateHandlers<LStateProps, LStateHandlerProps, CanvasProps>(
    props => ({
      ...props,
      ...defaultCanvasState,
      canvas: {},
      shouldAddEvents: true,
    }),
    {
      initFabricCanvas: state => (id: string) => ({
        ...state,
        canvas: initFabricCanvas(id),
      }),
      updateShouldAddEvents: state => (shouldAddEvents: boolean) => ({
        ...state,
        shouldAddEvents,
      }),
    },
  ),
  connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle<EnhancedFabricCanvasProps, {}>({
    componentDidMount() {
      this.props.initFabricCanvas(CANVAS_ID);
    },
    shouldComponentUpdate(nextProps: EnhancedFabricCanvasProps) {
      const {
        canvas,
        color,
        lineWidth,
        isDrawingMode,
        shouldAddEvents,
        canvasHistory,
      } = nextProps;
      const { updateCanvasHisotry, updateShouldAddEvents } = this.props;
      if (isInstanceOfFabricCanvas(canvas)) {
        changeColorMutates(canvas, color);
        changeDrawingModeMutates(canvas, isDrawingMode);
        replaceCanvasObjectsMutates(canvas, canvasHistory.present);
        changeLineWidthMutates(canvas, lineWidth);
        if (shouldAddEvents) {
          canvas.on('object:added', (e: IEvent) => {
            updateCanvasHisotry([...canvas._objects]);
          });
          updateShouldAddEvents(false);
        }
        canvas.renderAll();
      }
      return false;
    },
  }),
  pure,
);

export default enhance(Canvas as React.SFC<EnhancedFabricCanvasProps>);
