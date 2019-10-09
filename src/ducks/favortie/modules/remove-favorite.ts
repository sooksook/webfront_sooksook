import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { createReducer } from 'typesafe-actions';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

import {
  REQUEST_REMOVE_FAVORITES,
  SUCCESS_REMOVE_FAVORITES,
  FAILURE_REMOVE_FAVORITES,
  RemoveFavoriteActionTypes,
  IFavoriteState
} from '../interface';

export const removeFavorite = {
  request: (userId: string, plantId: string) => ({
    type: REQUEST_REMOVE_FAVORITES,
    userId,
    plantId
  }),
  success: (plantId: string, status: number) => {
    console.log('asd');
    return {
      type: SUCCESS_REMOVE_FAVORITES,
      plantId,
      favorite: status >= 400,
      status
    };
  },
  failure: (error: Error) => ({
    type: FAILURE_REMOVE_FAVORITES,
    error
  })
};

// EPIC
const removeFavoriteAjax = ({
  userId,
  plantId
}: ReturnType<typeof removeFavorite.request>) =>
  ajax({
    url: `/api/favorites`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: { userId, plantId }
  }).pipe(
    map((action) => removeFavorite.success(plantId, action.status)),
    catchError((error) => of(removeFavorite.failure(error)))
  );

export const removeFavoriteEpic: Epic = (
  action$: ActionsObservable<ReturnType<typeof removeFavorite.request>>
) =>
  action$.pipe(
    ofType(REQUEST_REMOVE_FAVORITES),
    mergeMap(removeFavoriteAjax)
  );

export default (initialState: IFavoriteState) =>
  createReducer<IFavoriteState, RemoveFavoriteActionTypes>(initialState, {
    [REQUEST_REMOVE_FAVORITES]: (state) => state,
    [SUCCESS_REMOVE_FAVORITES]: (state, { plantId, favorite, status }) => {
      const favorites = state.favorites.map((plant) =>
        plant.plantId === plantId ? { ...plant, favorite } : plant
      );
      return { ...state, favorites, status };
    },
    [FAILURE_REMOVE_FAVORITES]: (state, { error }) => ({ ...state, error })
  });
