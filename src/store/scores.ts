import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../models';
import { userService } from '../services';

export interface ScoreState {
  scoreboard: UserModel[] | null;
}

const scoresSlice = createSlice({
  name: 'scores',
  initialState: {
    scoreboard: null,
  } as ScoreState,
  reducers: {
    setScoreBoard: (state, action: PayloadAction<UserModel[]>) => {
      state.scoreboard = action.payload;
    },
  },
});

const { actions } = scoresSlice;
export const scoreReducer = scoresSlice.reducer;

export const getScoreBoard = () => async (dispatch: AppDispatch) => {
  // dispatch(actions.setLoading(true));

  const scores = await userService.getUserScoreboard();

  dispatch(actions.setScoreBoard(scores));

  return scores;
};

export const selectScoreBoard = (state: ApplicationState) => {
  return state.scores.scoreboard;
};
