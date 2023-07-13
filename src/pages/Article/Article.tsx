import { useState } from 'react';
import AllArticles from '../../components/AllArticles/AllArticles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCategory } from '../../App/reducers/categoryReducer';
function Article() {
  const [category, setCategory] = useState(0);
  const [stateChange, setStateChange] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const categoriesList = useAppSelector((state) => state.categories.categories);

  function handleClickedCategory(e: Event, id: Number) {
    e.preventDefault();
    setCategory(id);
    setStateChange(true);
  }

  return (
    <div className="Article flex w-full flex-col items-center">
      <ul className="mt-10 flex w-2/3  justify-around">
        {categoriesList &&
          categoriesList.map((item) => (
            <button
              key={item.category_id}
              className="rounded-lg bg-blue-500 px-4 py-2 text-blue-100 duration-300 hover:bg-blue-600"
              onClick={(e) => handleClickedCategory(e, item.category_id)}
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
  );
}

export default Article;
