import BookCard from './components/BookCard';

const books = [
  {
    id: 1,
    title: '星の王子さま',
    author: 'サン＝テグジュペリ',
    rating: 5,
    comment: '読むたびに新しい発見がある、大切にしたい一冊です。',
  },
  {
    id: 2,
    title: '嫌われる勇気',
    author: '岸見 一郎・古賀 史健',
    rating: 4,
    comment: '自分らしく生きるための考え方を整理してくれます。',
  },
  {
    id: 3,
    title: '夜は短し歩けよ乙女',
    author: '森見 登美彦',
    rating: 5,
    comment: '独特の言葉とテンポが楽しく、何度も読み返したくなります。',
  },
];

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            My Bookshelf
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            おすすめの本
          </h1>
          <p className="mt-3 text-slate-600">心に残った本を紹介します。</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              comment={book.comment}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;