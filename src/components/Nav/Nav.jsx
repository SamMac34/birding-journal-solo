import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import BasicMenu from '../Menu/Menu';


function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h1 className="nav-title">The Aviary</h1>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
                <BasicMenu />

            {/* <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/profile">
              Profile Page
            </Link>

            <Link className="navLink" to="/search">
              Search Page
            </Link>

            <Link className="navLink" to="/addbird">
              Add Bird<br />to Collection
            </Link> */}

            {/* <LogOutButton className="navLink" /> */}
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
