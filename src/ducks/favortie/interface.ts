import { fetchFavorite } from './modules/fetch-favorite';
import { postFavorite } from './modules/post-favorite';
import { removeFavorite } from './modules/remove-favorite';

// Action type
export const REQUEST_FETCH_FAVORITES = 'FAVORITE/REQUEST_FETCH_FAVORITES' as const;
export const SUCCESS_FETCH_FAVORITES = 'FAVORITE/SUCCESS_FETCH_FAVORITES' as const;
export const FAILURE_FETCH_FAVORITES = 'FAVORITE/FAILURE_FETCH_FAVORITES' as const;

export const REQUEST_REMOVE_FAVORITES = 'FAVORITE/REQUEST_REMOVE_FAVORITES' as const;
export const SUCCESS_REMOVE_FAVORITES = 'FAVORITE/SUCCESS_REMOVE_FAVORITES' as const;
export const FAILURE_REMOVE_FAVORITES = 'FAVORITE/FAILURE_REMOVE_FAVORITES' as const;

export const REQUEST_POST_FAVORITES = 'FAVORITE/REQUEST_POST_FAVORITES' as const;
export const SUCCESS_POST_FAVORITES = 'FAVORITE/SUCCESS_POST_FAVORITES' as const;
export const FAILURE_POST_FAVORITES = 'FAVORITE/FAILURE_POST_FAVORITES' as const;

// Action Object
export type FavoriteActionTypes =
  | ReturnType<typeof fetchFavorite.request>
  | ReturnType<typeof fetchFavorite.success>
  | ReturnType<typeof fetchFavorite.failure>;

export type PostFavoriteActionTypes =
  | ReturnType<typeof postFavorite.request>
  | ReturnType<typeof postFavorite.success>
  | ReturnType<typeof postFavorite.failure>;

export type RemoveFavoriteActionTypes =
  | ReturnType<typeof removeFavorite.request>
  | ReturnType<typeof removeFavorite.success>
  | ReturnType<typeof removeFavorite.failure>;

// Payload Interface
export interface IFavorite {
  userId: string;
  plantId: string;
  plantName: string;
  plantEngName: string;
  imageUrl: string;
  favorite: boolean;
}

export interface IFavoriteState {
  favorites: IFavorite[];
  loading: boolean;
  status: number;
  error?: Error;
}

export interface IFavoriteResponseSuccess {
  favorites: IFavorite[];
  status: number;
}

export interface IFavoriteResponseError {
  status: number;
  error: string;
  message: string;
}
