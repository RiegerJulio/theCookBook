import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi';

// import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  // const { title } = props;

  return (
    <div className="header">
      <Link to="/profile">
        {/* <img src={ profileIcon } data-testid="profile-top-btn" alt="profile button" /> */}
        <HiUserCircle size={ 40 } color="#ffffff" />
      </Link>
    </div>
  );
}

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };
