import TrendingTopics from "../TrendingTopics";

const DicoverNews = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Discover News from Around the World
      </h2>

      <section className="py-16 px-4 md:px-8 bg-gray-800">
        <div className="container mx-auto">
          <TrendingTopics />
        </div>
      </section>
    </div>
  );
};

export default DicoverNews;
