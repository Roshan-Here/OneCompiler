import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SetTokenFailed } from "../redux/User/userSlice";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openvault, setopenvault] = useState(false);
  const authenticated = useSelector((state) => state.user.authenticated);

  // console.log(openvault);

  const logout = () => {
    dispatch(SetTokenFailed());
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const handleVault = () => {
    openvault ? setopenvault(false) : setopenvault(true);
  };

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
          <ul className="flex items-center gap-2 md:gap-4 text-base text-slate-300">
            <Link to="/compiler">
              <li className="md:inline hover:opacity-75">Compiler</li>
            </Link>
            <Link to="/problems">
              <li className="hidden md:inline hover:opacity-75">Problems</li>
            </Link>
            <Link to="/pasteit">
              <li className="hidden md:inline hover:opacity-75">Pasteit</li>
            </Link>
            {authenticated ? (
              <>
                <div>
                  <button onClick={handleVault}>Options</button>
                </div>
                <div
                  className={`${
                    !openvault
                      ? "hidden"
                      : "absolute ml-3 md:ml-28 mt-32 w-36 rounded-md bg-slate-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  }`}
                >
                  <ul className="py-1">
                    <li
                      onClick={() => {
                        setopenvault(false)
                        navigate("/profile");
                      }}
                      className="block px-4 py-2 text-sm text-slate-100"
                    >
                      View Profile
                    </li>
                    <li
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-slate-50"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // <li onClick={logout} className="md:inline hover:opacity-75">Logout</li>
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
