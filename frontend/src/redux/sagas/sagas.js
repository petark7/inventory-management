import { all } from 'redux-saga/effects';
import watchInventoryActions from './inventorySaga';
import watchAuth from './authSaga';
import watchTransactionActions from './transactionsSaga';

// Root saga
export default function * rootSaga() {
	yield all([
		watchAuth(),
		watchInventoryActions(),
		watchTransactionActions()
	]);
}
