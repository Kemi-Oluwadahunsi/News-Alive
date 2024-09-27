export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Contact the Publisher</h3>
          <p className="text-gray-400">mike@runo.com</p>
          <p className="text-gray-400">+944 450 904 505</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Explorate</h3>
          <ul className="space-y-2">
            {[
              "About",
              "Partners",
              "Job Opportunities",
              "Advertise",
              "Membership",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Headquarter</h3>
          <p className="text-gray-400">191 Middleville Road,</p>
          <p className="text-gray-400">NY 1001, Sydney</p>
          <p className="text-gray-400">Australia</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Connections</h3>
          <div className="flex space-x-4">
            {["facebook", "twitter", "youtube", "instagram", "vimeo"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white"
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social} text-2xl`}></i>
                </a>
              )
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>2021 | RUNO Publisher Studio</p>
      </div>
    </footer>
  );
}
