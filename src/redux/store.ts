import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { root_reducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistor_config: PersistConfig<any, any, any, any> = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['loading', 'isloggedin']
};
const persistor_reducer = persistReducer(persistor_config, root_reducer);
const redux_store = createStore(
  persistor_reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(redux_store);

export { persistor, redux_store as store };
