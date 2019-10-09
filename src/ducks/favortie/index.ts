import { createReducer } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';

import { IFavoriteState, FavoriteActionTypes } from './interface';
import fetchFavoriteReducer, {
  fetchFavoriteEpic
} from './modules/fetch-favorite';
import postFavoriteReducer, { postFavoriteEpic } from './modules/post-favorite';
import removeFavoriteReducer, {
  removeFavoriteEpic
} from './modules/remove-favorite';

// REDUCER STATE
export const initialState: IFavoriteState = {
  favorites: [],
  loading: true,
  status: 200
};

export const favoriteEpics = combineEpics(
  fetchFavoriteEpic,
  postFavoriteEpic,
  removeFavoriteEpic
);

// REDUCER
export default createReducer<IFavoriteState, FavoriteActionTypes>(
  initialState,
  {
    ...fetchFavoriteReducer(initialState).handlers,
    ...postFavoriteReducer(initialState).handlers,
    ...removeFavoriteReducer(initialState).handlers
  }
);
