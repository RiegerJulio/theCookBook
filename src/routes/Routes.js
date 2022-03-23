import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Profile from '../pages/Profile';
import Drinks from '../pages/Drinks';
import RecipesDone from '../pages/RecipesDone';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import DetailedFood from '../pages/DetailedFood';
import DetailedDrink from '../pages/DetailedDrink';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsIng from '../pages/ExploreFoodsIng';
import ExploreDrinksIng from '../pages/ExploreDrinksIng';
import ExploreFoodsNat from '../pages/ExploreFoodsNat';
import FoodsInProgress from '../pages/FoodsInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';
import Error from '../pages/Error';
import EndMessage from '../pages/EndMessage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ RecipesDone } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route exact path="/foods/:id" component={ DetailedFood } />
      <Route exact path="/drinks/:id" component={ DetailedDrink } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreFoodsIng } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreDrinksIng } />
      <Route exact path="/explore/foods/nationalities" component={ ExploreFoodsNat } />
      <Route exact path="/done-recipes" component={ RecipesDone } />
      <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
      <Route exact path="/explore/drinks/nationalities" component={ Error } />
      <Route exact path="/end-message" component={ EndMessage } />
      {/*
      {/* <Route exact path="/headertest" component={ AllHeader } />
      */}
    </Switch>
  );
}
