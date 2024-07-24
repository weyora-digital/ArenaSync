import { useRoutes } from 'react-router-dom';

// local imports
import { HomePage } from './pages';

const Router = () => {
    return useRoutes([
        {
            path: '*',
            element: <HomePage />,
        },
    ]);
};

export default Router;
