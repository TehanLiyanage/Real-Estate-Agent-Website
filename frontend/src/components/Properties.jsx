import React from 'react';
import { Link } from 'react-router-dom';

const Properties = ({ properties, onAddToFavorites, handleDragStart }) => {
  console.log("✅ Rendering Properties:", properties); // Debugging log

  if (properties.length === 0) {
    return <h2 className="text-center text-gray-600">No properties found.</h2>;
  }

  return (
    <div className="container mx-auto py-4 px-6 md:px-20 lg:px-32 my-0 w-full" id="Properties">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">Properties</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id} // ✅ Fix: Use `_id`
            className="bg-white shadow-md rounded-3xl overflow-hidden"
            draggable
            onDragStart={(event) => handleDragStart(event, property)}
          >
            <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-gray-600">£{property.price}</p>
              <p className="text-gray-600">{property.bedrooms} Bedrooms</p>
              <p className="text-gray-600">{property.postcode}</p>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <button
                  onClick={() => onAddToFavorites(property)}
                  className="bg-amber-400 text-white px-4 py-2 rounded-2xl hover:bg-orange-500 transition"
                >
                  Add to Favorites
                </button>
                <Link
                  to={`/property/${property._id}`} // ✅ Fix: Use `_id`
                  className="bg-emerald-400 text-white px-4 py-2 rounded-2xl hover:bg-green-600 transition text-center"
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
