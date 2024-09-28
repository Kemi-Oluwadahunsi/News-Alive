

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const HeroCard = ({ article }) => (
//   <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
//     <img
//       src={article.urlToImage || "/placeholder.svg?height=400&width=800"}
//       alt={article.title}
//       className="absolute inset-0 h-full w-full object-cover"
//     />
//     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
//     <div className="absolute bottom-0 left-0 p-6 text-white">
//       <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
//       <p className="text-lg mb-4">{article.description}</p>
//       <Link
//         to={`/article/${encodeURIComponent(article.title)}`}
//         className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//       >
//         Read More
//       </Link>
//     </div>
//   </div>
// );

// export default function HeroSection({ articles = [] }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const heroArticles = articles.slice(0, 3);

//   useEffect(() => {
//     if (heroArticles.length === 0) return;

//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [heroArticles.length]);

//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + heroArticles.length) % heroArticles.length
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
//   };

//   if (heroArticles.length === 0) {
//     return (
//       <section className="relative my-8 h-[60vh] bg-gray-800 rounded-lg flex items-center justify-center">
//         <p className="text-2xl text-white">No articles available</p>
//       </section>
//     );
//   }

//   return (
//     <section className="relative my-8">
//       <HeroCard article={heroArticles[currentIndex]} />
//       {heroArticles.length > 1 && (
//         <>
//           <button
//             onClick={handlePrev}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
//             aria-label="Previous article"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={handleNext}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
//             aria-label="Next article"
//           >
//             <ChevronRight size={24} />
//           </button>

//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             {heroArticles.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === currentIndex
//                     ? "bg-blue-600"
//                     : "bg-white bg-opacity-50"
//                 } transition-all duration-500`}
//                 aria-label={`Go to article ${index + 1}`}
//               ></button>
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCard = ({ article }) => (
  <div className="relative h-[80vh] w-full overflow-hidden rounded-lg">
    <img
      src={article.urlToImage || "/placeholder.svg?height=400&width=800"}
      alt={article.title}
      className="absolute inset-0 h-full w-full object-cover bg-top"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
      <p className="text-lg mb-4">{article.description}</p>
      <Link
        to={`/article/${encodeURIComponent(article.title)}`}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        Read More
      </Link>
    </div>
  </div>
);

export default function HeroSection() {
  const { items: articles } = useSelector((state) => state.articles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroArticles = articles.slice(0, 3);

  useEffect(() => {
    if (heroArticles.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroArticles.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroArticles.length) % heroArticles.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroArticles.length);
  };

  if (heroArticles.length === 0) {
    return (
      <section className="relative my-8 h-[60vh] bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-2xl text-white">No articles available</p>
      </section>
    );
  }

  return (
    <section className="relative my-8">
      <HeroCard article={heroArticles[currentIndex]} />
      {heroArticles.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
            aria-label="Previous article"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
            aria-label="Next article"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-blue-600"
                    : "bg-white bg-opacity-50"
                } transition-all duration-500`}
                aria-label={`Go to article ${index + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}