import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import like from '../../assets/favicon/like.png';
import { fetchComments } from '../../App/reducers/commentReducer';

function MostRecentComment() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const comments = useAppSelector((state) => state.comments.comments);

  console.log(comments);

  const commentSorted: Comment[] = [...comments].reverse().slice(0, 4);

  return (
    <>
      <div className="w-min-[30%]  px-4 py-12 xl:px-0">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl tracking-wider text-gray-900 lg:text-4xl">
            Most recent comments
          </h1>
          <div>
            <div className="flex flex-col gap-4 ">
              {commentSorted.map((comment) => (
                <div key={comment.comment.comment_id} className="shadow-lg">
                  <div className="flex w-full justify-between bg-indigo-700 px-4 py-2">
                    <p className="text-sm font-semibold tracking-wide text-white">
                      {comment.comment.title}
                    </p>
                    <p className="text-sm font-semibold tracking-wide text-white">
                      {comment.pseudo}
                    </p>
                  </div>
                  <div className="rounded-bl-3xl rounded-br-3xl bg-white px-3 py-4 lg:px-6">
                    <p className="text-lg font-semibold tracking-wider text-gray-900">
                      {comment.comment.content}
                    </p>
                    <div className="mt-4 flex w-full cursor-pointer items-center  justify-between">
                      <p className="mt-2 line-clamp-2 overflow-hidden text-sm text-gray-700 lg:text-base lg:leading-8">
                        {new Date(comment.comment.created_at).toDateString()}
                      </p>
                      <p className="flex items-center text-lg tracking-wide text-indigo-500">
                        {comment.comment.likes}
                        <span>
                          <img src={like} alt="like symbol" className="w-8" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MostRecentComment;
