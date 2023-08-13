import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './UserPage.css'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <div className="user-page-container">
      <h2 className="user-name">Welcome Back, <span className="user-name-span">{user.username}</span>!</h2>

      <div className="user-page-btn-container">
      <h4 className="user-page-h4">Where would you like to go?</h4>

        <button className="user-page-profile-btn">
          <Link className="user-page-link" to="/profile">
            My Profile
          </Link>
        </button>
        <button className="user-page-search-btn">
          <Link className="user-page-link nav-link" to="/search">
            Search Birds
          </Link>
        </button>
        <LogOutButton className="user-page-logout-btn" />
      </div>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
