import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DetailPage from './pages/DetailPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/detail/:id" component={DetailPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
