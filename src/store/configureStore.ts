import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import { rootReducer, rootSaga } from './ducks';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};

export default configureStore;

export type AppDispatch = ReturnType<typeof configureStore>['store']['dispatch'];
export type AppStore = ReturnType<typeof configureStore>['store'];
export type AppState = ReturnType<AppStore['getState']>;
