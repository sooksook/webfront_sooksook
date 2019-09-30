import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { plantEdic, plantReducer } from './plant';

const rootEpic = combineEpics(plantEdic);

const rootReducer = combineReducers({ plant: plantReducer });

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
