import React, { useState } from 'react';
import DropDownButton from '../../components/buttons/DropDownButton';
import NavigationButton from '../../components/buttons/NavigationButton';
import { NavLink } from 'react-router-dom';

function Header() {
  const arr = [true, false, false, false, false, false];
  const [style, setStyle] = useState(arr);
  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState('Menu');

  const selected = (props: number) => {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i += 1) {
      newArr[i] = false;
    }
    newArr[props] = true;
    setStyle(newArr);
  };

  return (
    <div className="3xl:container 2xl:mx-auto">
      <div className="rounded bg-white px-7 py-5 shadow-lg">
        <nav className="flex justify-between">
          <div className="flex items-center space-x-3 pr-6 lg:pr-16">
            <h2 className="text-2xl font-normal leading-6 text-gray-800">
              Libranga
            </h2>
          </div>
          {/* For medium and plus sized devices */}
          <ul className="hidden flex-auto gap-4 space-x-2 lg:flex">
            <NavLink to="/">
              <NavigationButton
                title="Home"
                onClick={() => selected(0)}
                style={style}
                styleIndex={0}
              />
            </NavLink>
            <NavLink to="article">
              <NavigationButton
                title="Articles"
                onClick={() => selected(1)}
                style={style}
                styleIndex={1}
              />
            </NavLink>
            <NavLink to={'/'}>
              <NavigationButton
                title="Users"
                onClick={() => selected(2)}
                style={style}
                styleIndex={2}
              />
            </NavLink>
            <NavLink to={'/'}>
              <NavigationButton
                title="Categories"
                onClick={() => selected(3)}
                style={style}
                styleIndex={3}
              />
            </NavLink>
          </ul>
          <div>
            <ul className="hidden flex-auto space-x-2 md:hidden lg:flex">
              <li>
                <NavLink to="/login">
                  <button
                    type="button"
                    className="text-gray-600cursor-pointer rounded
                    border  border-white bg-gray-50 px-3 py-2.5  text-xs font-normal leading-3 shadow-md focus:outline-none"
                  >
                    Login
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup">
                  <button
                    type="button"
                    className="text-gray-600cursor-pointer rounded border
                    border-white  bg-blue-950 px-3 py-2.5 text-xs  font-normal leading-3 text-white shadow-md focus:outline-none"
                  >
                    Signup
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* for smaller devcies */}
        <div className="mt-5 block w-full lg:hidden ">
          <button
            type="button"
            onKeyDown={() => setDropDown(!dropDown)}
            onClick={() => setDropDown(!dropDown)}
            className="flex w-full cursor-pointer items-center justify-between rounded bg-blue-950 px-4 py-3 text-white"
          >
            <div className="flex space-x-2">
              <p className="cursor-pointer text-sm font-normal leading-3 duration-300 hover:bg-gray-800 focus:outline-none ">
                {text || 'Menu'}
              </p>
            </div>
            <svg
              id="ArrowSVG"
              className={`${
                dropDown ? '' : 'rotate-180'
              } transform duration-100`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className=" relative">
            <ul
              id="list"
              className={`${
                dropDown ? 'hidden' : 'block'
              } absolute top-2 w-full rounded text-base font-normal leading-4 shadow-md`}
            >
              <NavLink to="/">
                <DropDownButton
                  title="Home"
                  onClick={() => {
                    setText('Home');
                    setDropDown(!dropDown);
                  }}
                />
              </NavLink>

              <NavLink to="/article">
                <DropDownButton
                  title="Articles"
                  onClick={() => {
                    setText('Articles');
                    setDropDown(!dropDown);
                  }}
                />
              </NavLink>
              <DropDownButton
                title="Users"
                onClick={() => {
                  setText('Users');
                  setDropDown(!dropDown);
                }}
              />
              <DropDownButton
                title="Categories"
                onClick={() => {
                  setText('Categories');
                  setDropDown(!dropDown);
                }}
              />
              <DropDownButton
                title="Signup"
                onClick={() => {
                  setText('Signup');
                  setDropDown(!dropDown);
                }}
              />
              <DropDownButton
                title="Login"
                onClick={() => {
                  setText('Login');
                  setDropDown(!dropDown);
                }}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
