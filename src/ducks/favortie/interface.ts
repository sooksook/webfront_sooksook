// Action type
export const REQUEST_FETCH_FAVORITES = 'FAVORITE/REQUEST_FETCH_FAVORITES' as const;
export const SUCCESS_FETCH_FAVORITES = 'FAVORITE/SUCCESS_FETCH_FAVORITES' as const;
export const FAILURE_FETCH_FAVORITES = 'FAVORITE/FAILURE_FETCH_FAVORITES' as const;

// Payload Interface
export interface IFavorite {
  userId: string;
  plantId: string;
  plantName: string;
  plantEngName: string;
  imageUrl: string;
}

export interface IFavoriteState {
  favorites: IFavorite[];
  loading: boolean;
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
