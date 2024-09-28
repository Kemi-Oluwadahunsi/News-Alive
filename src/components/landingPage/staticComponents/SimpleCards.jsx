export const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-[0px_0px_5px_0px_rgba(37,99,235,0.5)]">
    <Icon className="text-blue-500 w-12 h-12 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
)
