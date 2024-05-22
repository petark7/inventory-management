import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import NavigationMenu from './components/NavigationMenu';
import router from './routes';

const App = () => (
	<RouterProvider router={router} />
);

export default App;
