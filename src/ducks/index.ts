import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { plantEdic, plantReducer } from './plant';
import favoriteReducer, { favoriteEpics } from './favortie';

const rootEpic = combineEpics(plantEdic, favoriteEpics);

const rootReducer = combineReducers({
  plant: plantReducer,
  favorites: favoriteReducer
});

const epicMiddleware = createEpicMiddleware();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);

  return store;
};

export default configStore;
