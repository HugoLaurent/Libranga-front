function ModelComment({
  comment_id,
  title,
  content,
  pseudo,
  date,
}: {
  comment_id: number;
  title: string;
  content: string;
  pseudo: string;
  date: string;
}) {
  return (
    <div key={comment_id} className="shadow-lg">
      <div className="flex w-full justify-between bg-indigo-700 px-4 py-2">
        <p className="text-sm font-semibold tracking-wide text-white">
          {title}
        </p>
        <p className="text-sm font-semibold tracking-wide text-white">
          {pseudo}
        </p>
      </div>
      <div className="rounded-bl-3xl rounded-br-3xl bg-white px-3 py-4 lg:px-6">
        <p className="text-lg font-semibold tracking-wider text-gray-900">
          {content}
        </p>
        <div className="mt-4 flex w-full cursor-pointer items-center  justify-between">
          <p className="mt-2 line-clamp-2 overflow-hidden text-sm text-gray-700 lg:text-base lg:leading-8">
            {new Date(date).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModelComment;
