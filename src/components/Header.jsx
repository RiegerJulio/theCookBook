import React from 'react';
import { Link } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi';

export default function Header() {

  return (
    <div className="header">
      <Link to="/profile">
        <HiUserCircle size={ 40 } color="#ffffff" />
      </Link>
    </div>
  );
}
