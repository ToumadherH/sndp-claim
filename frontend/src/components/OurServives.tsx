import React from "react";

const OurServices = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Figures that demonstrate our efficiency and your satisfaction
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
            <span className="text-5xl font-bold text-gray-900 mb-2">
              <span className="relative">
                <p className="text-6xl md:text-7xl font-bold mb-4 tracking-tight bg-gradient-to-r from-gray-800 to-yellow-400 bg-clip-text text-transparent">
                  227+
                </p>

                <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 opacity-60 -z-10"></span>
              </span>
            </span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Partner stations
            </h3>
            <p className="text-gray-600 text-sm">
              Active managers on the platform
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
            <span className="text-5xl font-bold text-gray-900 mb-2">
              <span className="relative">
                <p className="text-6xl md:text-7xl font-bold mb-4 tracking-tight bg-gradient-to-r from-gray-800 to-yellow-400 bg-clip-text text-transparent">
                  92%
                </p>

                <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 opacity-60 -z-10"></span>
              </span>
            </span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Satisfaction rate
            </h3>
            <p className="text-gray-600 text-sm">
              Complaints successfully handled
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
            <span className="text-5xl font-bold text-gray-900 mb-2">
              <span className="relative">
                <p className="text-6xl md:text-7xl font-bold mb-4 tracking-tight bg-gradient-to-r from-gray-800 to-yellow-400 bg-clip-text text-transparent">
                  24h
                </p>

                <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 opacity-60 -z-10"></span>
              </span>
            </span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Average time
            </h3>
            <p className="text-gray-600 text-sm">
              From first response to your complaints
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
            <span className="text-5xl font-bold text-gray-900 mb-2">
              <span className="relative">
                <p className="text-6xl md:text-7xl font-bold mb-4 tracking-tight bg-gradient-to-r from-gray-800 to-yellow-400 bg-clip-text text-transparent">
                  10k+
                </p>

                <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 opacity-60 -z-10"></span>
              </span>
            </span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Claims processed
            </h3>
            <p className="text-gray-600 text-sm">Since the platform's launch</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
