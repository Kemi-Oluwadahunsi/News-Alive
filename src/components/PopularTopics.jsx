export default function PopularTopics() {
  const topics = ["Adventure", "Travel", "Fashion", "Technology", "Branding"];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">Popular topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <a
            key={topic}
            href="#"
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition duration-300"
          >
            {topic}
          </a>
        ))}
      </div>
    </section>
  );
}
