import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './app.css';

export const App = () => <RouterProvider router={router} />;
