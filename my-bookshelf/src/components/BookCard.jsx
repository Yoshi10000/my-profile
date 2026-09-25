function BookCard({ title, author, rating, comment }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
          {rating}/5
        </span>
      </div>
      <p className="mb-4 text-sm font-medium text-slate-500">著者: {author}</p>
      <p className="mt-auto leading-7 text-slate-700">{comment}</p>
    </article>
  );
}

export default BookCard;