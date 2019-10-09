import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { createReducer } from 'typesafe-actions';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

import {
  REQUEST_FETCH_FAVORITES,
  SUCCESS_FETCH_FAVORITES,
  FAILURE_FETCH_FAVORITES,
  FavoriteActionTypes,
  IFavoriteResponseSuccess,
  IFavoriteState,
  IFavorite
} from '../interface';

// ACTION CREATORS
export const fetchFavorite = {
  request: (userId: string) => ({ userId, type: REQUEST_FETCH_FAVORITES }),
  success: (favorites: IFavorite[], status: number) => ({
    type: SUCCESS_FETCH_FAVORITES,
    favorites,
    status
  }),
  failure: (error: Error) => ({
    type: FAILURE_FETCH_FAVORITES,
    error
  })
};

// EPIC
const fetchFavoriteAjax = ({
  userId
}: ReturnType<typeof fetchFavorite.request>) =>
  ajax
    .getJSON<IFavoriteResponseSuccess>(`/api/favorites?userId=${userId}`)
    .pipe(
      map((action) => fetchFavorite.success(action.favorites, action.status)),
      catchError((error) => of(fetchFavorite.failure(error)))
    );

export const fetchFavoriteEpic: Epic = (
  action$: ActionsObservable<ReturnType<typeof fetchFavorite.request>>
) =>
  action$.pipe(
    ofType(REQUEST_FETCH_FAVORITES),
    mergeMap(fetchFavoriteAjax)
  );

// FETCH FAVORITE REDUCER
export default (initialState: IFavoriteState) =>
  createReducer<IFavoriteState, FavoriteActionTypes>(initialState, {
    [REQUEST_FETCH_FAVORITES]: (state) => ({ ...state, loading: true }),
    [SUCCESS_FETCH_FAVORITES]: (_, { favorites, status }) => ({
      loading: false,
      favorites: favorites.map((fav) => ({ ...fav, favorite: true })),
      status
    }),
    [FAILURE_FETCH_FAVORITES]: (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  });
