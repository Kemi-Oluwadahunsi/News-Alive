import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { fetchTrendingTopics } from "../../../utils/redux/slices/trendingSlice";
import ArticleCard from "../articles/ArticleCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TrendingTopics() {
  const dispatch = useDispatch();
  const { topics, status, error } = useSelector((state) => state.trending);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTrendingTopics());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center">Loading trending topics...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (topics.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center">Trending Topics</h2>
      <Slider {...settings}>
        {topics.map((topic, index) => (
          <div key={topic.title} className="px-4">
            <ArticleCard article={topic} index={index} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
