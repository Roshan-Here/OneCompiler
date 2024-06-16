import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SetTokenFailed } from "../redux/User/userSlice";

function Header() {
    const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.user.authenticated);

  const logout = () =>{
    dispatch(SetTokenFailed())
  }

  return (
    <div>
      <div className="bg-slate-800 flex max-w-8xl mx-auto p-5 justify-between items-center cursor-pointer border-b-4 border-cyan-500 rounded-b-lg overflow-hidden">
        <Link to="/">
          <div className="flex gap-1">
            <span className="font-medium text-3xl text-blue-600">One</span>
            <span className="font-semibold text-3xl text-cyan-300">
              Compiler
            </span>
          </div>
        </Link>
        <div>
          <ul className="flex items-center gap-4 text-base text-slate-300">
            <Link to="/about">
              <li className="md:inline hover:opacity-75">About</li>
            </Link>
            <Link to="/problems">
              <li className="hidden md:inline hover:opacity-75">Problems</li>
            </Link>
            <Link to="/pasteit">
              <li className="md:inline hover:opacity-75">Pasteit</li>
            </Link>
            {!authenticated ? (

                <li onClick={logout} className="md:inline hover:opacity-75">Logout</li>
            ) : (
              <Link to="/login">
                <li className="md:inline hover:opacity-75">Login</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
