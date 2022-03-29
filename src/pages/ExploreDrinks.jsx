import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { fetchRandomDrink } from '../services/fetchApi';

import headerLogo from '../images/header-logo.png';

export default function ExploreFoods() {
  const history = useHistory();

  const handleRandom = async () => {
    const response = await fetchRandomDrink();
    const drinkID = response.idDrink;
    history.push(`/drinks/${drinkID}`);
  };

  return (
    <>
      <div className="header-container">
        <Header title="Explore" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      <div className="explore-btn-container">
        <Link
          to="/explore/drinks/ingredients"
          className="waves-effect waves-light btn-large btn-explore red darken-4"
        >
          <span
            className="btn-explore-text"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </span>
        </Link>
        <Link
          className="waves-effect waves-light btn-large btn-explore lime darken-2"
          to="#t"
          onClick={ handleRandom }
        >
          <span
            className="btn-explore-text"
            data-testid="explore-surprise"
          >
            Surprise me!
          </span>
        </Link>
      </div>
      <LowerMenu />
    </>

  );
}
