import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic, ActionsObservable } from 'redux-observable';
import produce from 'immer';

import {
  PlantType,
  PlantActions,
  IFetchPlantAction,
  IPlantResponse,
  IPlantState
} from './interface';

export const fetchPlant = (id: string) => ({
  type: PlantType.FETCH_PLANTS,
  id
});

const getPlant = ({ plant }: IPlantResponse) => ({
  type: PlantType.SUCCESS_GET_PLANTS,
  plant
});

const errorGetPlant = (error: any) =>
  of({
    type: PlantType.FAIL_GET_PLANTS,
    error
  });

const fetchPlantAjax = ({ id }: IFetchPlantAction) => {
  return ajax.getJSON<IPlantResponse>(`/api/plants/${id}`).pipe(
    map(getPlant),
    catchError(errorGetPlant)
  );
};

export const plantEdic: Epic = (
  action$: ActionsObservable<IFetchPlantAction>
) =>
  action$.pipe(
    ofType(PlantType.FETCH_PLANTS),
    mergeMap(fetchPlantAjax)
  );

const initalState: IPlantState = {
  loading: false,
  plant: {
    category: '',
    difficulty: '',
    engName: '',
    favorite: false,
    growthType: '',
    imageSource: '',
    imageUrl: '',
    name: '',
    place: '',
    plantId: '',
    soil: '',
    sunlight: '',
    temparature: '',
    water: ''
  }
};

export const plantReducer = produce(
  (draft = initalState, action: PlantActions) => {
    switch (action.type) {
      case PlantType.FETCH_PLANTS:
        draft.loading = true;
        return draft;
      case PlantType.SUCCESS_GET_PLANTS:
        draft.loading = false;
        draft.plant = action.plant;
        return draft;
      case PlantType.FAIL_GET_PLANTS:
        draft.loading = false;
        draft.error = action.error;
        return draft;
      default:
        return draft;
    }
  }
);
