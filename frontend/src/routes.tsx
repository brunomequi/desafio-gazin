import { createBrowserRouter } from 'react-router-dom';

import LevelsPage from './pages/levels';
import LevelForm from './pages/levels/LevelForm';
import DevelopersPage from './pages/developers';
import DevelopersForm from './pages/developers/DeveloperForm';
import Layout from './components/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/levels',
        element: <LevelsPage />,
      },
      {
        path: '/levels/create',
        element: <LevelForm />,
      },
      {
        path: '/levels/edit/:id',
        element: <LevelForm />,
      },
      {
        path: '/developers',
        element: <DevelopersPage />,
      },
      {
        path: '/developers/create',
        element: <DevelopersForm />,
      },
      {
        path: '/developers/edit/:id',
        element: <DevelopersForm />,
      },
    ],
  },
]);
