import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import propertiesData from './properties.json';
import Header from './components/Header';
import Properties from './components/Properties';
import Favorites from './components/Favorites';
import PropertyDetails from './components/PropertyDetails';

const App = () => {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]);

  // Filter properties based on search criteria
  const handleSearch = (criteria) => {
    const filtered = propertiesData.filter((property) => {
      const propertyDate = new Date(property.added).toISOString().split('T')[0]; // Convert property date to YYYY-MM-DD
      const criteriaDate = criteria.added ? new Date(criteria.added).toISOString().split('T')[0] : null; // Convert criteria date to YYYY-MM-DD
  
      return (
        (criteria.type === 'Any' || !criteria.type || property.type === criteria.type) &&
        (!criteria.minPrice || property.price >= Number(criteria.minPrice)) &&
        (!criteria.maxPrice || property.price <= Number(criteria.maxPrice)) &&
        (!criteria.minBedrooms || property.bedrooms >= Number(criteria.minBedrooms)) &&
        (!criteria.maxBedrooms || property.bedrooms <= Number(criteria.maxBedrooms)) &&
        (!criteria.postcode || property.postcode.startsWith(criteria.postcode)) &&
        (!criteria.added || propertyDate === criteriaDate) // Compare formatted dates
      );
    });
  
    setFilteredProperties(filtered);
  };
  

  // Add a property to favorites
  const handleAddToFavorites = (property) => {
    if (!favorites.find((fav) => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  // Remove a single property from favorites
  const handleRemoveFromFavorites = (id) => {
    setFavorites(favorites.filter((property) => property.id !== id));
  };

  // Remove all properties from favorites
  const handleRemoveAllFavorites = () => {
    setFavorites([]);
  };

  // Handle drag start for adding/removing properties
  const handleDragStart = (event, property) => {
    event.dataTransfer.setData('propertyId', property.id);
  };

  // Handle drop events
  const handleDrop = (event, isFavoritesDropZone) => {
    const propertyId = event.dataTransfer.getData('propertyId');
    const property = propertiesData.find((p) => p.id === parseInt(propertyId));

    if (!isFavoritesDropZone && property) {
      handleRemoveFromFavorites(property.id); // Remove property when dragged out of favorites
    } else if (isFavoritesDropZone && property) {
      handleAddToFavorites(property); // Add property when dragged into favorites
    }
  };

  return (
    <Router>
      <div className="font-sans">
        {/* Header */}
        <Header onSearch={handleSearch} />

        <Routes>
          {/* Home Page with Properties and Favorites */}
          <Route
            path="/"
            element={
              <div className="flex">
                {/* Properties List */}
                <div
                  className="flex-1 p-4"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, false)} // Drop zone for removing from favorites
                >
                  <Properties
                    properties={filteredProperties}
                    onAddToFavorites={handleAddToFavorites}
                    handleDragStart={handleDragStart}
                  />
                </div>

                {/* Favorites Component */}
                <Favorites
                  favorites={favorites}
                  onRemoveFromFavorites={handleRemoveFromFavorites}
                  onRemoveAllFavorites={handleRemoveAllFavorites}
                  onDragStart={handleDragStart}
                  onDrop={(event) => handleDrop(event, true)} // Drop zone for adding to favorites
                />
              </div>
            }
          />

          {/* Property Details Page */}
          <Route
            path="/property/:id"
            element={<PropertyDetails onAddToFavorites={handleAddToFavorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
