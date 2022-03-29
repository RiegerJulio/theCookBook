import React, { useState, useContext, useEffect } from 'react';
import M from 'materialize-css';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ButtonCategory from '../components/ButtonCategory';
import Search from '../components/Search';
import ButtonShowBar from '../components/ButtonShowBar';

import './css/foodsAndDrinks.css';
import './css/header.css';

import headerLogo from '../images/header-logo.png';

import {
  fetchMeals,
  fetchMealsCategory } from '../services/fetchApi';

import MyContext from '../Context/MyContext';

const NUMBER_CARDS_INITIAL = 12;
const MAX_CATEGORIES_LENGHT = 5;

export default function Foods() {
  const {
    setMealsArray,
    initialCategoriesFood,
    requestApiFoods,
    setKind,
    renderKind,
    choose,
    redirectUniqueItem,
    buttonValue,
    setButtonValue,
  } = useContext(MyContext);

  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {
    });
    setKind('/foods/');
  }, []);

  const getFilter = async ({ target }) => {
    if (categoryFilter === null || categoryFilter !== target.id) {
      const a = target.id;
      setButtonValue(a);
      const filterMeals = await fetchMealsCategory(a);
      setMealsArray(filterMeals);
      setCategoryFilter(target.id);
    } else {
      const mealsApi = await fetchMeals();
      setMealsArray(mealsApi);
    }
  };

  return (
    <div className="page-container">
      <div className="header-container">
        <Header/>
        <img
          src={ headerLogo }
          alt="header logo"
          className="header-logo"
          data-testid="header-Logo"
        />
        <ButtonShowBar />
      </div>
        <Search />
      <h1 data-testid="page-title" className="header-title">Search Foods</h1>
      <ul className="collapsible red darken-4 collapse-foods">
        <li>
          <div className="collapsible-header red darken-4">
            Categories
          </div>
          <div className="collapsible-body">
            <div className="btn-header-container">
              <ButtonCategory
                strCategory="All"
                index="All"
                func={ requestApiFoods }
              />
              {
                initialCategoriesFood.map((category, index) => (
                  <ButtonCategory
                    key={ category.strCategory }
                    strCategory={ category.strCategory }
                    index={ index }
                    func={ getFilter }
                  />
                )).slice(0, MAX_CATEGORIES_LENGHT)
                // O método slice() retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim (fim não é necessário) de um array original. O Array original não é modificado.
                // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
              }
              <ButtonCategory
                strCategory="Vegetarian"
                index="Vegetarian"
                func={ getFilter }
              />
              <ButtonCategory
                strCategory="Vegan"
                index="Vegan"
                func={ getFilter }
              />
            </div>
          </div>
        </li>
      </ul>
      <div className="meals-container">
        {
          renderKind().length === 1 && buttonValue === 'Search'
            ? renderKind().map(() => redirectUniqueItem())
            : renderKind().map((item, index) => choose(item, index))
              .slice(0, NUMBER_CARDS_INITIAL)
        }
      </div>
      <LowerMenu />
    </div>
  );
}
