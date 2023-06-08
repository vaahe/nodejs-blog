import { useRoutes } from 'react-router';

import { Layout } from './layouts';
import { routes } from './routes';


export const App = () => {
  const element = useRoutes(routes);

  return (
    <Layout>
      {element}
    </Layout>
  );
}
