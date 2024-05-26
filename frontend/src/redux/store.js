import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import rootSaga from './sagas/sagas';
import { appLoaded } from './actions/authActions';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		auth: authReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

store.dispatch(appLoaded());
export { store };
export default store;
