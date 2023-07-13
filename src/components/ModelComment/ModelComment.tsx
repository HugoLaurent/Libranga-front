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
    <div key={comment_id} className="border shadow-2xl">
      <div className="rounded-bl-3xl rounded-br-3xl bg-white px-3 py-4 lg:px-6">
        <p className="items-center text-sm tracking-wider text-gray-900">
          {content}
        </p>
        <div className="mt-4 flex gap-2">
          <p className="text-right font-semibold tracking-wide">{pseudo}</p>
          <span className="text-xs">{new Date(date).toDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default ModelComment;
