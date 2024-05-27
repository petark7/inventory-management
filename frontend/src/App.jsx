import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import router from './routes';
import store from './redux/store';

const App = () => (
	<Provider store={store}>
		<RouterProvider router={router} />
		<ToastContainer />
	</Provider>
);

export default App;
