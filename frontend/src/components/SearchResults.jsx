import React from 'react';

const SearchResults = ({ properties, onViewDetails }) => {
  return (
    <div className="results">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <p>£{property.price}</p>
          <p>{property.bedrooms} Bedrooms</p>
          <p>{property.postcode}</p>
          <button
            onClick={() => onViewDetails(property.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
