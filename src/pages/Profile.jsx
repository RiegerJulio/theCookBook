import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { getLocalStorage } from '../services/localStorage';

import headerLogo from '../images/header-logo.png';
import { Link } from 'react-router-dom';

function Profile() {
  const Email = getLocalStorage('user') || { email: '' };
  const history = useHistory();

  const Logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <div className="header-container">
        <Header/>
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      <h1 data-testid="profile-email" className="header-title">
        { Object.values(Email) }
      </h1>
      <div className="explore-btn-container">
        <Link
          className="waves-effect waves-light btn-large btn-explore red darken-4"
          to="/done-recipes"
          data-testid="profile-done-btn"
        >
          <span
            className="btn-explore-text"
          >
          Done Recipes
          </span>
        </Link>
        <Link
          className="waves-effect waves-light btn-large btn-explore brown darken-4"
          to="/favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          <span
            className="btn-explore-text"
          >
          Favorite Recipes
          </span>
        </Link>
        <Link
          className="waves-effect waves-light btn-large btn-explore lime darken-2"
          to="#t"
          data-testid="profile-logout-btn"
          onClick={ Logout }
        >
          <span
            className="btn-explore-text"
          >
          Logout
          </span>
        </Link>
      </div>
      <LowerMenu />
    </div>
  );
}

export default Profile;
