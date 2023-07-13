import { articleLiked } from '../../App/reducers/articleReducer';
import like from '../../assets/favicon/like.png';
import { useAppDispatch } from '../../hooks/redux';

function ModelArticle({
  article_id,
  manga,
  pseudo,
  date,
  title,
  content,
  likes,
}: {
  article_id: Number;
  manga: String;
  pseudo: String;
  date: String;
  title: String;
  content: String;
  likes: Number;
}) {
  const dispatch = useAppDispatch();

  function handleArticlesLikePlus(
    e: React.MouseEvent<HTMLButtonElement>,
    articleId: Number,
    likes: Number
  ) {
    e.preventDefault();
    const updatedLikes = likes + 1;
    dispatch(articleLiked({ articleId, updatedLikes }));
  }

  return (
    <div key={article_id} className="shadow-lg">
      <p className=" inset-0 flex items-center justify-center rounded-t  bg-blue-950 p-2 text-3xl font-bold text-white">
        {manga}
      </p>

      <div className="flex w-full justify-between bg-indigo-700 px-4 py-2">
        <p className="text-sm font-semibold tracking-wide text-white">
          {pseudo}
        </p>
        <p className="text-sm font-semibold tracking-wide text-white">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
      <div className="rounded-bl-3xl rounded-br-3xl bg-white px-3 py-4 lg:px-6">
        <h1 className=" text-lg font-semibold tracking-wider text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-700 lg:text-base lg:leading-8"></p>
        {content}

        <div className="mt-4 flex w-full cursor-pointer items-center justify-end">
          <p className="flex items-center text-lg tracking-wide text-indigo-500">
            {likes}{' '}
            <button
              type="button"
              onClick={(e) => handleArticlesLikePlus(e, article_id, likes)}
            >
              <span>
                <img src={like} alt="like symbol" className="w-8" />
              </span>
            </button>
          </p>
        </div>
        <p className="text-right">Write a comment</p>
      </div>
    </div>
  );
}

export default ModelArticle;
