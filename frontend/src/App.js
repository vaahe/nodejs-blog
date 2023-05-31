import { useRoutes } from 'react-router';

import { Layout } from './layout';
import { routes } from './routes';


const App = () => {
  const element = useRoutes(routes);

  return (
    <div className="App">
      <Layout>
        {element}
      </Layout>
    </div>
  );
}

export default App;
