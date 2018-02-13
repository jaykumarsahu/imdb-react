import React from 'react';
import ReactDOM from 'react-dom';
import { Panel } from 'react-bootstrap';
import './index.css';

import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Favicon from 'react-favicon';

import SignIn from './components/session/signin';
import SignOut from './components/session/signout';
import Movies from './components/movies';
import MovieNew from './components/movies/new';
import Show from './components/movies/show';
import Registration from './components/registration';
// import Home from './components/home';
import Header from './pages/header';
import Footer from './pages/footer';
import store from './store';
import ReduxBlockUi from 'react-block-ui/redux';


import { START_LOADING, STOP_LOADING } from './constants/action-types';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ReduxBlockUi
        tag="div"
        block={START_LOADING}
        unblock={STOP_LOADING}
        onChange=""
      >
        <Favicon url="./favicon.ico" />
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route exact path="/movies/new" component={MovieNew} />
          <Route exact path="/movies/:id" component={Show} />
          <Route exact path="/signup" component={Registration} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />
          <Route render={() => <h1>not found</h1>} />
        </Switch>
        <Footer />
      </ReduxBlockUi>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
