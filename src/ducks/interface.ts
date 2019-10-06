import { IPlantState } from './plant/interface';
import { IFavoriteState } from './favortie/interface';

export default interface IStore {
  plant: IPlantState;
  favorites: IFavoriteState;
}
