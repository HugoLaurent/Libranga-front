import { useState } from 'react';
import AllArticles from '../../components/AllArticles/AllArticles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCategory } from '../../App/reducers/categoryReducer';
import DropDownButton from '../../components/buttons/DropDownButton';
function Article() {
  const [category, setCategory] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [text, setText] = useState('Category menu');
  const [stateChange, setStateChange] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const categoriesList = useAppSelector((state) => state.categories.categories);

  function handleClickedCategory(e: Event, id: Number, menuName: String) {
    e.preventDefault();
    setCategory(id);
    setStateChange(true);
    setText(menuName);
    setDropDown(!dropDown);
  }

  return (
    <div>
      <div className="mx-auto mt-5 block w-1/2 lg:hidden ">
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
            className={`${dropDown ? '' : 'rotate-180'} transform duration-100`}
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
            } absolute top-2 w-1/2 rounded text-base font-normal leading-4 shadow-md`}
          >
            {categoriesList &&
              categoriesList.map((item) => (
                <DropDownButton
                  title={item.name}
                  onClick={(e) =>
                    handleClickedCategory(e, item.category_id, item.name)
                  }
                ></DropDownButton>
              ))}
          </ul>
        </div>
      </div>
      <div className="Article flex w-full flex-col items-center">
        <ul className="mr-2 hidden w-[80%] justify-around lg:flex ">
          {categoriesList &&
            categoriesList.map((item) => (
              <button
                key={item.category_id}
                className="rounded-lg bg-blue-500 px-4 py-2 text-blue-100 duration-300 hover:bg-blue-600"
                onClick={(e) =>
                  handleClickedCategory(e, item.category_id, item.name)
                }
              >
                <li key={item.category_id}>{item.name}</li>
              </button>
            ))}
        </ul>
        <AllArticles
          category={category}
          setCategory={setCategory}
          stateChange={stateChange}
        />
      </div>
    </div>
  );
}

export default Article;
