import React from 'react'
import { useContext } from 'react'
import { HiSearchCircle } from 'react-icons/hi'
import MyContext from '../Context/MyContext'

export default function ButtonShowBar() {
  const { toggleShowBar, setToggleShowBar} = useContext(MyContext);

  return (
    <div>
      <button
      className="btn-search"
      type="button"
      data-testid="search-top-btn"
      onClick={ () => setToggleShowBar(!toggleShowBar) }
    >
      <HiSearchCircle size={ 40 } color="#ffffff" />
    </button>
    </div>
  )
}
