// this component contains the details of the Key features section on the landing page. It is called in the landing page component.

import { FeatureCard } from "./SimpleCards";
import { Globe, TrendingUp, Users } from "lucide-react";

const Features = () => {
  return (
    <div>
      <section className="py-16 px-4 md:px-8 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Globe}
              title="Global Coverage"
              description="Access news from various sources worldwide, covering diverse topics and regions."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Trending Stories"
              description="Stay updated with the most popular and trending news stories across different categories."
            />
            <FeatureCard
              icon={Users}
              title="Personalized Feed"
              description="Get news tailored to your interests with our smart recommendation system."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
