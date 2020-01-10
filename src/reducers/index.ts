import actions from 'actions';
import { fabricDefaultSettings } from 'lib/fabric';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { User } from 'lib/api';

export interface CanvasHistory {
  present: fabric.Object[];
  future: fabric.Object[];
}
export interface State {
  canvasSettings: {
    color?: string;
    lineWidth: number;
    isDrawingMode?: boolean;
    sketchType?: string;
  };
  canvasHistory: CanvasHistory;
  users: { data: User[] | []; loading: boolean; error: {} | null };
}

export const initialState: State = {
  canvasSettings: { ...fabricDefaultSettings },
  canvasHistory: { present: [], future: [] },
  users: { data: [], loading: false, error: null },
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.changeColor, (state, payload) => ({
    ...state,
    canvasSettings: { ...state.canvasSettings, color: payload.color },
  }))
  .case(actions.changeLineWidth, (state, payload) => ({
    ...state,
    canvasSettings: {
      ...state.canvasSettings,
      lineWidth: payload.lineWidth || state.canvasSettings.lineWidth,
    },
  }))
  .case(actions.changeDrawingMode, (state, payload) => ({
    ...state,
    canvasSettings: {
      ...state.canvasSettings,
      isDrawingMode: payload.isDrawingMode,
    },
  }))
  .case(actions.changeSketchType, (state, payload) => ({
    ...state,
    canvasSettings: { ...state.canvasSettings, sketchType: payload.sketchType },
  }))
  .case(actions.updateCanvasHisotry, (state, payload) => ({
    ...state,
    canvasHistory: {
      present: payload.presentCanvasHistory || state.canvasHistory.present,
      future: [],
    },
  }))
  .case(actions.undoCanvasHistory, state => {
    const { present, future } = state.canvasHistory;
    return {
      ...state,
      canvasHistory: {
        present: present.slice(0, present.length - 1),
        future: [...future, ...present.slice(-1)],
      },
    };
  })
  .case(actions.redoCanvasHistory, state => {
    const { present, future } = state.canvasHistory;
    return {
      ...state,
      canvasHistory: {
        present: [...present, ...future.slice(-1)],
        future: [...future.slice(0, future.length - 1)],
      },
    };
  })
  .case(actions.fetchUsers.started, state => {
    return { ...state, users: { data: [], loading: true, error: null } };
  })
  .case(actions.fetchUsers.done, (state, payload) => {
    return {
      ...state,
      users: { data: payload.result, loading: false, error: null },
    };
  })
  .case(actions.fetchUsers.failed, (state, payload) => {
    return {
      ...state,
      users: { data: [], loading: false, error: payload.error },
    };
  });

export default reducers;
