import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// import Loading from './components/Common/Loading';
import configStore from './ducks';

const Detail = lazy(() => import('./components/Detail'));
const Favorite = lazy(() => import('./components/Favorite'));

const store = configStore();

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div />}>
            <Switch>
              <Route path="/detail/:id" component={Detail} />
              <Route path="/favorites" component={Favorite} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
