import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import InProgressFoodComponent from '../components/InProgressFoodComponent';
import { fetchMealDetailsId } from '../services/fetchApi';
import LowerMenu from '../components/LowerMenu';

export default function FoodsInProgress() {
  const {
    itemRecovered,
    setItemRecovered,
    imageFav,
    favFuncMeal,
  } = useContext(MyContext);

  const { id } = useParams();

  const history = useHistory();
  const idURLLocation = history.location.pathname.split('/')[2];
  console.log(idURLLocation);

  useEffect(async () => {
    const recoverData = await fetchMealDetailsId(idURLLocation);
    setItemRecovered([recoverData]);
    // console.log(recoverData);
  }, []);

  return (
    <div>
      {
        itemRecovered.length > 0
        && itemRecovered.map((it, index) => (
          <InProgressFoodComponent
            key={ index }
            index={ index }
            strMeal={ it.strMeal }
            strMealThumb={ it.strMealThumb }
            strCategory={ it.strCategory }
            strInstructions={ it.strInstructions }
            iconFav={ imageFav }
            onClickFav={ () => favFuncMeal(id) }
          />
        ))
      }
      <LowerMenu />
    </div>
  );
}
