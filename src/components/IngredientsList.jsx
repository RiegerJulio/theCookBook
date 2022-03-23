import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import MyContext from '../Context/MyContext';
import '../App.css';

export default function IngredientsList() {
  const {
    itemRecovered,
    // verify,
    // inProgressRecipes,
    // setInProgressRecipes,
  } = useContext(MyContext);

  const { id } = useParams();
  const history = useHistory();
  const [check, setCheck] = useState({});
  // const [listIngredientesCheck, setListIngredientesCheck] = useState(['']);

  // Criação do array de ingredientes com o controle checked
  const createIngredientList = () => {
    const keys = Object.keys(itemRecovered[0]);
    // console.log(keys);
    const ingredientsName = keys.reduce((array, key) => {
      const str = itemRecovered[0][key];
      // console.log(str);
      const condition = (key.includes('strIngredient') && str !== '' && str !== null);
      return (condition) ? array.concat(str) : array;
    }, []);
    // console.log(ingredientsName);
    const measures = keys.reduce((array, key) => {
      const str = (
        itemRecovered[0][key] !== ' ' && itemRecovered[0][key] !== null
      ) ? itemRecovered[0][key] : '';
      const condition = key.includes('strMeasure');
      return (condition) ? array.concat(str) : array;
    }, []);
    // console.log(measures);
    const ingredients = ingredientsName.map((name, index) => ({
      name,
      measure: measures[index],
      checked: false,
    }));
    // console.log(ingredients);
    return ingredients;
  };
  const list = createIngredientList();

  const handleCheckBox = (target) => {
    const { value } = target;
    if (check[value] === undefined) {
      check[value] = true;
    } else {
      check[value] = !check[value];
    }
    target.parentElement.classList.toggle('line-through');
    setCheck(check);
    console.log(target.value);
    console.log(Object.entries(check));
    setLocalStorage('check', check);
    const type = history.location.pathname.split('/')[1];
    const nameChave = type === 'drinks' ? 'cocktails' : 'meals';
    setLocalStorage('inProgressRecipes', { [nameChave]: { [id]: [target.value] } }); // trocar target.value por array com os ingrientes
    const inProgressRecipes3 = getLocalStorage('inProgressRecipes');
    const arrayIngredientsId = inProgressRecipes3[nameChave];
    console.log(arrayIngredientsId);
  };

  return (
    <section>
      {
        list.map((ingredient, index) => {
          const { name, measure } = ingredient;
          return (
            <p>
              <label
                key={ index }
                htmlFor={ index }
                // className="selection_label"
                className='label-color'
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  id={ index }
                  key={ index }
                  type="checkbox"
                  className="filled-in red"
                  onChange={ ({ target }) => handleCheckBox(target) }
                  value={ `${name}-medida-${measure}` }
                />
                <span className="checkbox-style">{`${name}${' - '}${measure}`}</span>
              </label>
            </p>
          );
        })
      }
    </section>
  );
}
IngredientsList.propTypes = {
  itemRecovered: PropTypes.object,
}.isRequired;