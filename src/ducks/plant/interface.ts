export enum PlantType {
  FETCH_PLANTS = 'FETCH_PLANTS',
  SUCCESS_GET_PLANTS = 'GET_SUCCESS_PLANTS',
  FAIL_GET_PLANTS = 'GET_FAIL_PLANTS'
}

export interface IFetchPlantAction {
  type: PlantType.FETCH_PLANTS;
  id: string;
}

export interface IGetSuccessPlant {
  type: PlantType.SUCCESS_GET_PLANTS;
  plant: IPlant;
}

export interface IGetFailPlant {
  type: PlantType.FAIL_GET_PLANTS;
  error: Error;
}

export interface IPlant {
  favorite: boolean;
  plantId: string;
  name: string;
  category: string;
  engName: string;
  imageUrl: string;
  imageSource: string;
  difficulty: string;
  sunlight: string;
  growthType: string;
  place: string;
  water: string;
  soil: string;
  temparature: string;
}

export interface IPlantResponse {
  plant: IPlant;
  status: number;
}

export type PlantActions = IFetchPlantAction | IGetSuccessPlant | IGetFailPlant;

export interface IPlantState {
  loading: boolean;
  plant: IPlant;
  error?: Error;
}
