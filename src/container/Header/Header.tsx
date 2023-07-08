import React, { useState } from 'react';
import DropDownButton from '../../components/buttons/DropDownButton';
import NavigationButton from '../../components/buttons/NavigationButton';

function Header() {
  const arr = [true, false, false, false, false, false];
  const [style, setStyle] = useState(arr);
  const [dropDown, setDropDown] = useState(true);

  const selected = (props: number) => {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i += 1) {
      newArr[i] = false;
    }
    newArr[props] = true;
    setStyle(newArr);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="rounded bg-white px-7 py-5 shadow-lg">
        <nav className="flex justify-between">
          <div className="flex items-center space-x-3 pr-6 lg:pr-16">
            <h2 className="text-2xl font-normal leading-6 text-gray-800">
              Libranga
            </h2>
          </div>
          {/* For medium and plus sized devices */}
          <ul className="hidden flex-auto space-x-2 md:flex">
            <NavigationButton
              title="Home"
              onClick={() => selected(0)}
              style={style}
              styleIndex={0}
            />
            <NavigationButton
              title="Articles"
              onClick={() => selected(1)}
              style={style}
              styleIndex={1}
            />
            <NavigationButton
              title="Users"
              onClick={() => selected(2)}
              style={style}
              styleIndex={2}
            />
            <NavigationButton
              title="Categories"
              onClick={() => selected(2)}
              style={style}
              styleIndex={2}
            />
          </ul>
          <div>
            <ul className="hidden flex-auto space-x-2 md:flex">
              <li>
                <button
                  type="button"
                  className="text-gray-600cursor-pointer rounded
                  border  border-white bg-gray-50 px-3 py-2.5  text-xs font-normal leading-3 shadow-md focus:outline-none"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-600cursor-pointer rounded border
                  border-white  bg-blue-950 px-3 py-2.5 text-xs  font-normal leading-3 text-white shadow-md focus:outline-none"
                >
                  Signup
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* for smaller devcies */}
        <div className="mt-5 block w-full md:hidden ">
          <button
            type="button"
            onKeyDown={() => setDropDown(!dropDown)}
            onClick={() => setDropDown(!dropDown)}
            className="flex w-full cursor-pointer items-center justify-between rounded bg-blue-950 px-4 py-3 text-white"
          >
            <div className="flex space-x-2">
              <p
                id="textClicked"
                className="cursor-pointer text-sm font-normal leading-3 duration-100 hover:bg-gray-800 focus:outline-none "
              >
                Menu
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
              } absolute top-2 w-full rounded text-base  font-normal leading-4 shadow-md`}
            >
              <DropDownButton title="Home" onClick={() => selected(2)} />
              <DropDownButton title="Articles" onClick={() => selected(2)} />
              <DropDownButton title="Users" onClick={() => selected(2)} />
              <DropDownButton title="Categories" onClick={() => selected(2)} />
              <DropDownButton title="Signup" onClick={() => selected(2)} />
              <DropDownButton title="Login" onClick={() => selected(2)} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
