export default function EditorsPick({ articles }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">Editor&apos;s Pick</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <div
            key={article.url}
            className="relative h-[300px] overflow-hidden rounded-lg"
          >
            <img
              src={
                article.urlToImage || "/placeholder.svg?height=300&width=500"
              }
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white px-2 py-1 text-xs uppercase tracking-wider">
                {article.source.name}
              </span>
              <h3 className="text-xl font-semibold mt-2">{article.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
