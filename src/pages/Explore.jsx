import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

import headerLogo from '../images/header-logo.png';
import './css/explore.css';

export default function Explore() {
  return (
    <>
      <div className="header-container">
        <Header title="Explore" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      <h1 data-testid="page-title" className="header-title">Explore</h1>
      <div className="explore-btn-container">
        <Link
          to="/explore/foods"
          className="waves-effect waves-light btn-large btn-explore red darken-4"
        >
          <span
            className="btn-explore-text"
            data-testid="explore-foods"
          >
            Explore Foods
          </span>
        </Link>
        <Link
          to="/explore/drinks"
          className="waves-effect waves-light btn-large btn-explore lime darken-2"
        >
          <span
            className="btn-explore-text"
            data-testid="explore-drinks"
          >
            Explore Drinks
          </span>
        </Link>
      </div>
      <LowerMenu />
    </>
  );
}
