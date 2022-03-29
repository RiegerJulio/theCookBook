import React from 'react';
import { Link } from 'react-router-dom';
import { GiHotMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { MdTravelExplore } from 'react-icons/md';

import '../pages/css/lowerMenu.css';

export default function LowerMenu() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <BiDrink size={ 40 } color="#afb42b" />
      </Link>
      <Link to="/explore">
        <MdTravelExplore size={ 40 } color="#3e2723" />
      </Link>
      <Link to="/foods">
        <GiHotMeal size={ 40 } color="#B71C1C" />
      </Link>
    </footer>
  );
}
