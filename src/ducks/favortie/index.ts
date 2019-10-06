import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { createReducer } from 'typesafe-actions';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

import {
  REQUEST_FETCH_FAVORITES,
  SUCCESS_FETCH_FAVORITES,
  FAILURE_FETCH_FAVORITES,
  IFavoriteState,
  IFavorite,
  IFavoriteResponseSuccess
} from './interface';

// ACTION CREATORS
export const fetchFavorite = {
  request: (userId: string) => ({ userId, type: REQUEST_FETCH_FAVORITES }),
  success: (favorites: IFavorite[]) => ({
    type: SUCCESS_FETCH_FAVORITES,
    favorites
  }),
  failure: (error: Error) => ({
    type: FAILURE_FETCH_FAVORITES,
    error
  })
};

const { request, success, failure } = fetchFavorite;
export type FavoriteActionTypes =
  | ReturnType<typeof request>
  | ReturnType<typeof success>
  | ReturnType<typeof failure>;

// EPIC
const fetchFavoriteAjax = ({
  userId
}: ReturnType<typeof fetchFavorite.request>) =>
  ajax
    .getJSON<IFavoriteResponseSuccess>(`/api/favorites?userId=${userId}`)
    .pipe(
      map((action) => fetchFavorite.success(action.favorites)),
      catchError((error) => of(fetchFavorite.failure(error)))
    );

export const favoriteEpic: Epic = (
  action$: ActionsObservable<ReturnType<typeof request>>
) =>
  action$.pipe(
    ofType(REQUEST_FETCH_FAVORITES),
    mergeMap(fetchFavoriteAjax)
  );

// REDUCER STATE
const initialState: IFavoriteState = {
  favorites: [],
  loading: true
};

// REDUCER
export const favoriteReducer = createReducer<
  IFavoriteState,
  FavoriteActionTypes
>(initialState, {
  [REQUEST_FETCH_FAVORITES]: (state) => ({ ...state, loading: true }),
  [SUCCESS_FETCH_FAVORITES]: (_, { favorites }) => ({
    loading: false,
    favorites
  }),
  [FAILURE_FETCH_FAVORITES]: (state, { error }) => ({
    ...state,
    loading: false,
    error
  })
});
