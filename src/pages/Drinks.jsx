/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-var */
import React, { useContext, useState, useEffect } from 'react';
import M from 'materialize-css';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ButtonCategory from '../components/ButtonCategory';
import ButtonShowBar from '../components/ButtonShowBar';
import Search from '../components/Search';

import './css/foodsAndDrinks.css';
import './css/header.css';

import headerLogo from '../images/header-logo.png';

import {
  fetchDrinks,
  fetchDrinksCategory } from '../services/fetchApi';

import MyContext from '../Context/MyContext';

export default function Drinks() {
  const { initialCategoriesDrink,
    requestApiDrinks,
    setDrinksArray,
    setKind,
    renderKind,
    redirectUniqueItem,
    choose,
  } = useContext(MyContext);

  const [categoryFilter, setCategoryFilter] = useState('');

  const NUMBER_CARDS_INITIAL = 12;
  const MAX_CATEGORIES_LENGHT = 5;

  const getFilter = async ({ target }) => {
    if (categoryFilter === null || categoryFilter !== target.id) {
      const category = target.id;
      const filterDrink = await fetchDrinksCategory(category);
      setDrinksArray(filterDrink);
      setCategoryFilter(category);
    } else {
      const drinks = await fetchDrinks();
      setDrinksArray(drinks);
    }
  };

  useEffect(() => {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {
    });
    console.log(instances);
    setKind('/drinks/');
  }, []);

  return (
    <div className="page-container">
      <div className="header-container">
        <Header title="Drinks" renderSearchBtn="true" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <ButtonShowBar />
      </div>
        <Search />
      <h1 data-testid="page-title" className="header-title">Search Drinks</h1>
      <ul className="collapsible red darken-4 collapse-foods">
        <li>
          <div className="collapsible-header red darken-4">
            Categories
          </div>
          <div className="collapsible-body">
            <div className="btn-header-container">
              <ButtonCategory
                index="All"
                strCategory="All"
                func={ requestApiDrinks }
              />
              {
                initialCategoriesDrink.map((category, index) => (
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
            </div>
          </div>
        </li>
      </ul>
      <div className="meals-container">
        {
          renderKind().length === 1
            ? renderKind().map(() => redirectUniqueItem())
            : renderKind().map((item, index) => choose(item, index))
              .slice(0, NUMBER_CARDS_INITIAL)
        }
      </div>
      <LowerMenu />
    </div>
  );
}
