import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import DetailPage from './pages/DetailPage';
import configStore from './ducks';

const store = configStore();

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/detail/:id" component={DetailPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
