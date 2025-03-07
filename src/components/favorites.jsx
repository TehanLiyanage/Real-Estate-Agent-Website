import React from 'react';

const Favorites = ({
  favorites,
  onRemoveFromFavorites,
  onDrop,
  onRemoveAllFavorites,
  onDragStart,
}) => {
  return (
    <div
      className="w-1/5 p-2 bg-orange-100 rounded-lg shadow-md mr-8"
      onDragOver={(event) => event.preventDefault()} // Allow drop events
      onDrop={onDrop} // Handle drop events
    >
      <div id="favorites" // Added for anchor linking
      ></div>
      <h2 className="text-xl font-semibold mb-2 text-center">Favorite Properties</h2>
      {favorites.length > 0 ? (
        <>
          {/* Remove All Button */}
          <button
            onClick={onRemoveAllFavorites}
            className="mb-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Remove All
          </button>
          <div className="space-y-2">
            {/* Render Each Favorite Property */}
            {favorites.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow-md p-3 rounded-lg flex justify-between items-center"
                draggable
                onDragStart={(event) => onDragStart(event, property)} // Handle drag start
              >
                <div>
                  <h3 className="text-md font-semibold">{property.title}</h3>
                  <p className="text-gray-600">£{property.price}</p>
                </div>
                <button
                  onClick={() => onRemoveFromFavorites(property.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center">No properties in favorites.</p>
      )}
    </div>
  );
};

export default Favorites;
