import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Favicon from 'react-favicon';
import ReduxBlockUi from 'react-block-ui/redux';
import './index.css';

import SignIn from './components/session/signin';
import SignOut from './components/session/signout';
import Movies from './components/movies';
import MovieNew from './components/movies/new';
import Show from './components/movies/show';
import Registration from './components/registration';
import Header from './pages/header';
// import Footer from './pages/footer';
import { alertError } from './pages/alert';
import store from './store';
import { isUserLoggedIn } from './services/user-info';
import { START_LOADING, STOP_LOADING } from './constants/action-types';


console.log("efrewf", process.env.NODE_ENV)

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
          <Route
            render={() => {
                alertError('Page not found.');
                return <Redirect to={isUserLoggedIn() ? '/' : '/signin'} />;
              }
            }
          />
        </Switch>
      </ReduxBlockUi>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
