import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllUser } from '../../App/reducers/userReducer';

import { UserAttributes } from '../../interface';
import { getDays } from '../../hooks/getDays';

function UserContainer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const usersToSort = useAppSelector((state) => state.users.user);
  const users: UserAttributes[] = [...usersToSort];

  users.sort((a, b) => b.articles?.length - a.articles?.length);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container mx-auto flex justify-center pt-16">
        <div>
          <h1 className="mx-auto w-5/6 pb-6 text-center text-3xl font-extrabold text-gray-800 sm:w-4/6 xl:text-4xl">
            The Librangaka Behind the Articles
          </h1>
        </div>
      </div>
      <section className="flex w-3/5 flex-wrap justify-around">
        {users &&
          users.slice(0, 6).map((user: UserAttributes) => {
            const totalLikes = user.articles?.reduce(
              (accumulator, article) => accumulator + article.likes,
              0
            );
            const totalComments = user.Comments?.length
              ? user.Comments.length
              : 0;

            return (
              <div
                key={user.user_id}
                className=" mt-16 h-fit  sm:w-3/4 md:w-2/5 lg:w-2/5 xl:w-1/3 xl:max-w-sm"
              >
                <div className="overflow-hidden rounded border border-secondary bg-white shadow-md">
                  <div className="  bg-secondary pb-1 text-center text-3xl font-bold text-white">
                    {user.pseudo}
                  </div>
                  <div className="mt-8 px-6">
                    <div className="pb-1 text-center text-3xl font-bold">
                      {user.articles?.length}{' '}
                      {user.articles?.length === 1 ? 'Article' : 'Articles'}
                    </div>

                    <p className="py-3 text-center text-base font-normal text-gray-600">
                      Librangaka since {getDays(user.created_at)}
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="text-center text-base font-normal text-gray-600">
                        Total Comments: {totalComments}
                      </p>
                      <p className="text-center text-base font-normal text-gray-600">
                        Total Likes: {totalLikes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default UserContainer;
