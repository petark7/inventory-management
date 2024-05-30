import { all } from 'redux-saga/effects';
import watchInventoryActions from './inventorySaga';
import watchAuth from './authSaga';

// Root saga
export default function * rootSaga() {
	yield all([
		watchAuth(),
		watchInventoryActions()
	]);
}
