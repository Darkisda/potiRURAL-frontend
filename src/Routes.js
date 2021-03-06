import React, { useContext } from 'react';
import { Spinner, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainWrapper from './pages/MainWrapper';
import RecipesPage from './pages/RecipesPage';
import Recipe from './pages/Recipe';
import ArticlesPage from './pages/ArticlesPage';
import Article from './pages/Article';
import Market from './pages/Market';
import CreateBarraca from './pages/CreateBarraca';
import CreateArticle from './pages/CreateArticle';
import CreateRecipe from './pages/CreateRecipe';
import BarracaPage from './pages/BarracaPage';
import EventsPage from './pages/EventsPage';
import Event from './pages/Event';
import { Context } from './auth/AuthContext';
import Perfil from './pages/Perfil';
import CreateEvent from './pages/CreateEvent';
import UpdateArticle from './pages/UpdateArticle';
import UpdateRecipe from './pages/UpdateRecipe';
import UpdateBarraca from './pages/UpdateBarraca';
import UpdateEvent from './pages/UpdateEvent';
import HelpsPage from './pages/HelpsPage';
import CreateHelp from './pages/CreateHelp';
import UpdateHelp from './pages/UpdateHelp';

const mySwal = withReactContent(Swal);

function CustomRoute({ isPrivate, ...rest }) {
  const { authenticate, loaded } = useContext(Context);

  if (!loaded) {
    return (
      <Row className="custom-row">
        <div className="loading">
          <Spinner animation="border" />
          <h1>Loading...</h1>
        </div>
      </Row>
    );
  }

  if (isPrivate && !authenticate) {
    mySwal.fire({
      title: <p>Você precisa está logado para poder criar algo!</p>,
      icon: 'info',
    });
    return <Redirect to="/signin" />;
  }

  return <Route {...rest} />;
}

function AdminRoute({ isAdmin, ...rest }) {
  const { authenticate, loaded, userLogged } = useContext(Context);

  if (!loaded) {
    return (
      <Row className="custom-row">
        <div className="loading">
          <Spinner animation="border" />
          <h1>Loading...</h1>
        </div>
      </Row>
    );
  }

  if ((isAdmin && !authenticate) || userLogged.occupation !== 'ADMIN') {
    return <Redirect to="/perfil" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/" exact component={MainWrapper} />
        <CustomRoute path="/signin" exact component={SignIn} />
        <CustomRoute path="/signup" exact component={SignUp} />
        <CustomRoute path="/recipes" exact component={RecipesPage} />
        <CustomRoute
          isPrivate
          path="/recipes/create"
          exact
          component={CreateRecipe}
        />
        <CustomRoute path="/recipes/:id" exact component={Recipe} />
        <CustomRoute
          path="/recipes/:id/edit"
          isPrivate
          exact
          component={UpdateRecipe}
        />
        <CustomRoute path="/articles" exact component={ArticlesPage} />
        <CustomRoute
          isPrivate
          path="/articles/create"
          exact
          component={CreateArticle}
        />
        <CustomRoute path="/articles/:id" exact component={Article} />
        <CustomRoute
          isPrivate
          path="/articles/:id/edit"
          exact
          component={UpdateArticle}
        />
        <CustomRoute path="/markets" exact component={Market} />
        <CustomRoute
          isPrivate
          path="/markets/create"
          exact
          component={CreateBarraca}
        />
        <CustomRoute path="/markets/:id" exact component={BarracaPage} />
        <CustomRoute
          path="/markets/:id/edit"
          isPrivate
          exact
          component={UpdateBarraca}
        />
        <CustomRoute path="/events" exact component={EventsPage} />
        <AdminRoute
          isAdmin
          path="/events/create"
          exact
          component={CreateEvent}
        />
        <CustomRoute path="/events/:id" exact component={Event} />
        <AdminRoute
          path="/events/:id/edit"
          isAdmin
          exact
          component={UpdateEvent}
        />
        <CustomRoute isPrivate path="/perfil" exact component={Perfil} />
        <CustomRoute path="/helps" exact component={HelpsPage} />
        <CustomRoute
          path="/helps/create"
          isPrivate
          exact
          component={CreateHelp}
        />
        <CustomRoute
          path="/helps/:id/edit"
          isPrivate
          exact
          component={UpdateHelp}
        />
      </Switch>
    </BrowserRouter>
  );
}
