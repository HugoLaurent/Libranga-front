import { useState, useEffect } from 'react';
import AllArticles from '../../components/AllArticles/AllArticles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCategory } from '../../App/reducers/categoryReducer';
import DropDownButton from '../../components/buttons/DropDownButton';

function Article() {
  // Etat pour la version mobile
  const [dropDownMobile, setDropDownMobile] = useState(false);

  // Etat pour la version de bureau
  const [dropDownDesktop, setDropDownDesktop] = useState(false);

  const [category, setCategory] = useState(0);
  const [text, setText] = useState('Category menu');
  const [stateChange, setStateChange] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const categoriesList = useAppSelector((state) => state.categories.categories);

  function handleClickedCategory(e: Event, id: number, menuName: string) {
    e.preventDefault();
    setCategory(id);
    setStateChange(true);
    setText(menuName);

    // Pour la version mobile
    setDropDownMobile(false);

    // Pour la version de bureau
    setDropDownDesktop(false);
  }

  return (
    <div>
      {/* Version mobile */}
      <div className="mx-auto mt-5 block w-1/2 lg:hidden">
        <button
          type="button"
          onKeyDown={() => setDropDownMobile(!dropDownMobile)}
          onClick={() => setDropDownMobile(!dropDownMobile)}
          className="flex w-full cursor-pointer items-center justify-between rounded bg-secondary px-4 py-3 text-white"
        >
          <div className="flex space-x-2">
            <p className="cursor-pointer text-sm font-normal leading-3 duration-300 hover:bg-gray-800 focus:outline-none">
              {text || 'Menu'}
            </p>
          </div>
          <svg
            id="ArrowSVG"
            className={`${
              dropDownMobile ? '' : 'rotate-180'
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
        <div className={`relative ${dropDownMobile ? '' : 'hidden'}`}>
          <ul className="absolute top-2 z-10 w-full rounded text-base font-normal leading-4 shadow-md">
            <DropDownButton
              title="All"
              onClick={(e) => handleClickedCategory(e, 0, 'All')}
            ></DropDownButton>
            {categoriesList &&
              categoriesList.map((item) => (
                <DropDownButton
                  key={item.category_id}
                  title={item.name}
                  onClick={(e) =>
                    handleClickedCategory(e, item.category_id, item.name)
                  }
                ></DropDownButton>
              ))}
          </ul>
        </div>
      </div>

      {/* Version de bureau */}
      <div className="Article flex w-full flex-col items-center">
        <ul className="mr-2 hidden w-[80%] justify-around lg:flex">
          <button
            key="0"
            className="rounded-lg bg-blue-500 px-4 py-2 text-blue-100 duration-300 hover:bg-blue-600"
            onClick={(e) => handleClickedCategory(e, 0, 'all')}
          >
            <li key={0}>All</li>
          </button>
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
