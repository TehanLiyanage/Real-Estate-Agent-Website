import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Properties from './components/Properties';
import Favorites from './components/favorites';
import PropertyDetails from './components/PropertyDetails';

const App = () => {
  const [properties, setProperties] = useState([]); // ✅ Store all properties from MongoDB
  const [filteredProperties, setFilteredProperties] = useState([]); // ✅ Stores filtered results
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteProperties');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
  }, [favorites]);


  // ✅ Fetch properties from MongoDB API on initial load
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`); // ✅ Correct API URL
      console.log("✅ Properties Fetched:", response.data); // Debugging Log
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("❌ Error fetching properties:", error);
    }
  };
  
  // ✅ Filter properties based on search criteria
  const handleSearch = (criteria) => {
    const filtered = properties.filter((property) => {
      const propertyDate = new Date(property.added).toISOString().split('T')[0]; 
      const criteriaDate = criteria.added ? new Date(criteria.added).toISOString().split('T')[0] : null;

      return (
        (criteria.type === 'Any' || !criteria.type || property.type === criteria.type) &&
        (!criteria.minPrice || property.price >= Number(criteria.minPrice)) &&
        (!criteria.maxPrice || property.price <= Number(criteria.maxPrice)) &&
        (!criteria.minBedrooms || property.bedrooms >= Number(criteria.minBedrooms)) &&
        (!criteria.maxBedrooms || property.bedrooms <= Number(criteria.maxBedrooms)) &&
        (!criteria.postcode || property.postcode.startsWith(criteria.postcode)) &&
        (!criteria.added || propertyDate === criteriaDate)
      );
    });

    setFilteredProperties(filtered);
  };

  // ✅ Fix: MongoDB uses `_id` instead of `id`
  const handleAddToFavorites = (property) => {
    if (!favorites.find((fav) => fav._id === property._id)) {
      setFavorites([...favorites, property]);
    }
  };

  const handleRemoveFromFavorites = (_id) => {
    setFavorites(favorites.filter((property) => property._id !== _id));
  };

  const handleRemoveAllFavorites = () => {
    setFavorites([]);
  };

  // ✅ Fix Drag Start (Send `_id` instead of `id`)
  const handleDragStart = (event, property) => {
    event.dataTransfer.setData('propertyId', property._id);
  };

  const handleDrop = (event, isFavoritesDropZone) => {
    const propertyId = event.dataTransfer.getData('propertyId');
    const property = properties.find((p) => p._id === propertyId);

    if (!isFavoritesDropZone && property) {
      handleRemoveFromFavorites(property._id);
    } else if (isFavoritesDropZone && property) {
      handleAddToFavorites(property);
    }
  };

  return (
    <Router>
      <div className="font-sans">
        <Header onSearch={handleSearch} />

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex">
                <div
                  className="flex-1 p-4"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, false)}
                >
                  <Properties
                    properties={filteredProperties} // ✅ Correct property state
                    onAddToFavorites={handleAddToFavorites}
                    handleDragStart={handleDragStart}
                  />
                </div>

                <Favorites
                  favorites={favorites}
                  onRemoveFromFavorites={handleRemoveFromFavorites}
                  onRemoveAllFavorites={handleRemoveAllFavorites}
                  onDragStart={handleDragStart}
                  onDrop={(event) => handleDrop(event, true)}
                />
              </div>
            }
          />
          <Route path="/property/:id" element={<PropertyDetails onAddToFavorites={handleAddToFavorites} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
