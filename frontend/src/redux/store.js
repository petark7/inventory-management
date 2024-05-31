import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import rootSaga from './sagas/sagas';
import { appLoaded } from './actions/authActions';
import inventoryReducer from './slices/inventorySlice';
import transactionsReducer from './slices/transactionsSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		auth: authReducer,
		inventory: inventoryReducer,
		transactions: transactionsReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

store.dispatch(appLoaded());

export { store };
export default store;
