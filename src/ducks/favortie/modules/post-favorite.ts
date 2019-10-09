import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { createReducer } from 'typesafe-actions';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

import {
  REQUEST_POST_FAVORITES,
  SUCCESS_POST_FAVORITES,
  FAILURE_POST_FAVORITES,
  IFavoriteState,
  PostFavoriteActionTypes
} from '../interface';

export const postFavorite = {
  request: (userId: string, plantId: string) => ({
    type: REQUEST_POST_FAVORITES,
    userId,
    plantId
  }),
  success: (plantId: string, status: number) => ({
    type: SUCCESS_POST_FAVORITES,
    plantId,
    favorite: status < 400,
    status
  }),
  failure: (error: Error) => ({
    type: FAILURE_POST_FAVORITES,
    error
  })
};

// EPIC
const removeFavoriteAjax = ({
  userId,
  plantId
}: ReturnType<typeof postFavorite.request>) =>
  ajax
    .post(
      `/api/favorites`,
      { userId, plantId },
      { 'Content-Type': 'application/json' }
    )
    .pipe(
      map((action) => postFavorite.success(plantId, action.status)),
      catchError((error) => of(postFavorite.failure(error)))
    );

export const postFavoriteEpic: Epic = (
  action$: ActionsObservable<ReturnType<typeof postFavorite.request>>
) =>
  action$.pipe(
    ofType(REQUEST_POST_FAVORITES),
    mergeMap(removeFavoriteAjax)
  );

export default (initialState: IFavoriteState) =>
  createReducer<IFavoriteState, PostFavoriteActionTypes>(initialState, {
    [REQUEST_POST_FAVORITES]: (state) => ({ ...state }),
    [SUCCESS_POST_FAVORITES]: (state, { plantId, favorite, status }) => {
      const favorites = state.favorites.map((plant) =>
        plant.plantId === plantId ? { ...plant, favorite } : plant
      );
      return { ...state, favorites, status };
    },
    [FAILURE_POST_FAVORITES]: (state, { error }) => ({ ...state, error })
  });
