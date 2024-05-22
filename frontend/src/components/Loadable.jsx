import { Suspense } from 'react';

// Project import
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = Component => function (properties) {
	return (
		<Suspense fallback={<Loader />}>
			<Component {...properties} />
		</Suspense>
	);
};

export default Loadable;
