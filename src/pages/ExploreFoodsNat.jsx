import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import M from 'materialize-css';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import RecipesCardFood from '../components/RecipesCardFood';
// import Search from '../components/Search';
import MyContext from '../Context/MyContext';
import {
  fetchMealNationalities,
  fetchMealsName,
  fetchMealsNationality,
} from '../services/fetchApi';

import headerLogo from '../images/header-logo.png';

export default function ExploreFoodsNat() {
  const NUMBER_CARDS_INITIAL = 12;
  const [nationalities, setNationalities] = useState([]);
  const [menu, setMenu] = useState('All');
  const {
    mealsArray,
    setMealsArray } = useContext(MyContext);

  const grabNationalities = async () => {
    const fetchNationalities = await fetchMealNationalities();
    setNationalities(fetchNationalities);
  };

  const getMeals = async () => {
    const fetchMeals = await fetchMealsName('');
    setMealsArray(fetchMeals);
  };

  const fetchFoodsInNationality = async (nat) => {
    const fetchMealsNat = await fetchMealsNationality(nat);
    setMealsArray(fetchMealsNat);
  };

  useEffect(() => {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      // specify options here
    });
    console.log(instances);
    grabNationalities();
    getMeals();
  }, []);

  const handleChange = ({ target: { value } }) => {
    setMenu(value);
    if (value === 'All') {
      getMeals();
    } fetchFoodsInNationality(value);
  };

  return (
    <>
      <div className="header-container">
        <Header title="Search for Foods" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        {/* <Search /> */}
        <div className="white-space"/>
      </div>
      <div className="select-container">
        <select
          className="browser-default"
          id="nationalities"
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
          value={ menu }
        >
          <option
            value="All"
          >
            Select a Country:
          </option>
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {
            nationalities.map((opt) => (
              <option
                key={ opt.strArea }
                data-testid={ `${opt.strArea}-option` }
                value={ nationalities.strArea }
              >
                { opt.strArea }
              </option>
            ))
          }
        </select>
      </div>
      <div className="meals-container">
        {
          mealsArray && mealsArray.map((meal, index) => (
            // <Link
            //   to={ `/foods/${meal.idMeal}` }
            //   key={ meal.idMeal }
            // >
            <RecipesCardFood
              key={ meal.idMeal }
              idMeal={ meal.idMeal }
              strMeal={ meal.strMeal }
              strMealThumb={ meal.strMealThumb }
              index={ index }
            />
            // </Link>
          )).slice(0, NUMBER_CARDS_INITIAL)
        }
      </div>
      <LowerMenu />
    </>
  );
}
