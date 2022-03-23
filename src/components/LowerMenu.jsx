import React from 'react';
import { Link } from 'react-router-dom';
import { GiHotMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { MdTravelExplore } from 'react-icons/md';

// import drinkIMG from '../images/drinkIcon.svg';
// import exploreIMG from '../images/exploreIcon.svg';
// import foodIMG from '../images/mealIcon.svg';

import '../pages/css/lowerMenu.css';

export default function LowerMenu() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <BiDrink size={ 40 } color="#afb42b" />
        {/* <img src={ drinkIMG } alt="drink icon" data-testid="drinks-bottom-btn" /> */}
      </Link>
      <Link to="/explore">
        <MdTravelExplore size={ 40 } color="#3e2723" />
        {/* <img src={ exploreIMG } alt="explore icon" data-testid="explore-bottom-btn" /> */}
      </Link>
      <Link to="/foods">
        <GiHotMeal size={ 40 } color="#B71C1C" />
        {/* <img src={ foodIMG } alt="food icon" data-testid="food-bottom-btn" /> */}
      </Link>
    </footer>
  );
}
