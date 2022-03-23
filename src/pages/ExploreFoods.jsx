import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { fetchRandomMeal } from '../services/fetchApi';

import headerLogo from '../images/header-logo.png';

export default function ExploreFoods() {
  const history = useHistory();

  const handleRandom = async () => {
    const response = await fetchRandomMeal();
    console.log(response);
    const foodID = response.idMeal;
    history.push(`/foods/${foodID}`);
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
          to="/explore/foods/ingredients"
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
          to="/explore/foods/nationalities"
          className="waves-effect waves-light btn-large btn-explore brown darken-4"
        >
          <span
            className="btn-explore-text"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </span>
        </Link>
        {/* implementar logica abaixo */}
        <Link
          to="#t"
          className="waves-effect waves-light btn-large btn-explore lime darken-2"
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
