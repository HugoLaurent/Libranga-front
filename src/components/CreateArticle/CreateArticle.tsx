import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCategory } from '../../App/reducers/categoryReducer';
import { createArticle } from '../../App/reducers/articleReducer';
import {
  MangaAttributes,
  FormDataAttributes,
  ArticleAttributes,
} from '../../interface';

function CreateArticle() {
  const dispatch = useAppDispatch();
  const [showMessage, setShowMessage] = useState(false);

  const [manga, setManga] = useState('');
  const [listManga, setListManga] = useState<MangaAttributes[]>([]);
  const [url] = useState('');
  const [formData, setFormData] = useState<
    FormDataAttributes & Partial<ArticleAttributes>
  >({
    title: '',
    content: '',
    category_id: 0,
    manga: '',
    user_id: 1,
    likes: 0,
    edited: false,
    url: url,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    key: keyof FormDataAttributes
  ) {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: key === 'category_id' ? parseInt(value) : value,
    }));
  }

  async function fetchImageUrl(formData: FormDataAttributes) {
    const selectedManga = listManga.find(
      (manga) => manga.title === formData.manga
    );
    const imageUrl = selectedManga ? selectedManga.images.jpg.image_url : '';
    return imageUrl;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const imageUrl = await fetchImageUrl(formData);
    const updatedFormData: any = {
      ...formData,
      url: imageUrl,
    };

    dispatch(createArticle(updatedFormData));
  }

  async function researchManga(e: any) {
    setManga(e.target.value);
    const response = await axios.get(
      `https://api.jikan.moe/v4/manga?q=${manga}`
    );
    setListManga(response.data.data);
    setShowMessage(true);
  }

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const categories = useAppSelector((state) => state.categories);

  return (
    <>
      <div className="bg-indigo-50">
        <div className="items-center justify-center px-4 py-9 2xl:container sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:mx-auto">
          <div className="w-full rounded bg-white px-2 py-6 shadow-lg sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
            <p className="mb-5 text-2xl font-extrabold leading-6 text-gray-800 focus:outline-none">
              Create an article
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="manga"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {' '}
                  Manga{' '}
                </label>
                <div className="flex gap-3 ">
                  <input
                    className="mt-2  flex-1 bg-inherit py-2 pl-3 text-xs leading-none focus:border-none "
                    id="nameSearch"
                    type="text"
                    name="nameSearch"
                    onChange={(e) => setManga(e.target.value)}
                    placeholder="Search"
                  ></input>
                  <button type="button" onClick={(e) => researchManga(e)}>
                    Go
                  </button>
                </div>
                <select
                  required
                  value={formData.manga}
                  onChange={(e) => handleChange(e, 'manga')}
                  id="manga"
                  aria-labelledby="manga"
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                >
                  <option value="" disabled>
                    {showMessage
                      ? 'You can now choose a manga'
                      : 'Search a manga first'}
                  </option>
                  {listManga.map((manga) => (
                    <option key={manga.mal_id} value={manga.title}>
                      {manga.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {' '}
                  Title{' '}
                </label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChange(e, 'title')}
                  id="title"
                  aria-labelledby="title"
                  type="text"
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                  placeholder="Title of your article"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Your article
                </label>
                <textarea
                  required
                  value={formData.content}
                  id="content"
                  name="content"
                  onChange={(e: any) => handleChange(e, 'content')}
                  aria-labelledby="content"
                  className="mt-2 h-fit w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                  placeholder="Write your article"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Category
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => handleChange(e, 'category_id')}
                  id="category"
                  aria-labelledby="category"
                  className="mt-2 h-fit w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                  placeholder="Choose a category"
                >
                  <option value={0} disabled>
                    {formData.category_id === 0
                      ? 'Choose a category'
                      : 'Shonen'}
                  </option>
                  {categories.categories &&
                    categories.categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  role="button"
                  className="w-full rounded border bg-indigo-700 py-4 text-sm font-semibold leading-none text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                >
                  Create my account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateArticle;
