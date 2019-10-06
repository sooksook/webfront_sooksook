import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configStore from './ducks';

import Detail from './components/Detail';
import Favorite from './components/Favorite';

const store = configStore();

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/detail/:id" component={Detail} />
            <Route path="/favorites" component={Favorite} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
