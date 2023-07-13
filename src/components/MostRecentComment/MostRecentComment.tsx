import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { fetchComments } from '../../App/reducers/commentReducer';

import { CommentAttributes } from '../../interface';
import ModelComment from '../ModelComment/ModelComment';

function MostRecentComment() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const comments = useAppSelector((state) => state.comments.comments);

  const commentSorted: CommentAttributes[] = [...comments]
    .reverse()
    .slice(0, 4);
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
                <div key={comment.comment_id} className="shadow-lg">
                  <ModelComment
                    comment_id={comment.comment_id}
                    title={comment.title}
                    content={comment.content}
                    pseudo={comment.pseudo}
                    date={comment.created_at}
                  />
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
