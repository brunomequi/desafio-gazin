import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './assets/app.css';

export const App = () => <RouterProvider router={router} />;
