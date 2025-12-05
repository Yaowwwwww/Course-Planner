import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MainPage from '../pages/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/planner',
    element: <MainPage />,
  },
  {
    path: '/planner/favorites',
    element: <MainPage />,
  },
  {
    path: '/planner/archive',
    element: <MainPage />,
  },
]);
