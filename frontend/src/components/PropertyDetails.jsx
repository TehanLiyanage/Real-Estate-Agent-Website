import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyDetails = ({ onAddToFavorites }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  // ✅ Fetch Property Details from API
  useEffect(() => {
    fetch(`http://localhost:3000/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Property Details:", data); // Debugging log
        setProperty(data);
      })
      .catch((error) => console.error("❌ Error fetching property details:", error));
  }, [id]);

  if (!property) {
    return <div className="text-center py-20">Property not found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Property Image */}
        <img src={property.image} alt={property.title} className="w-full h-96 object-cover rounded-lg" />

        {/* Property Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">£{property.price}</h2>
          <p className="text-gray-700">{property.shortDescription}</p>
          <ul>
            <li>Type: {property.type}</li>
            <li>Bedrooms: {property.bedrooms}</li>
            <li>Postcode: {property.postcode}</li>
            <li>Date Added: {new Date(property.added).toLocaleDateString()}</li>
          </ul>
          <button
            onClick={() => onAddToFavorites(property)}
            className="bg-amber-400 text-white px-6 py-2 rounded-2xl hover:bg-orange-500 transition"
            style={{ width: '200px' }}
          >
            Add to Favorites
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs className="mt-10">
        <TabList>
          <Tab>Images</Tab>
          <Tab>Long Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        {/* ✅ Images Tab */}
        <TabPanel>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {property.images && property.images.length > 0 ? (
              property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Property ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
        </TabPanel>

        {/* ✅ Long Description Tab */}
        <TabPanel>
          <div className="mt-4">
            <h3 className="text-2xl font-bold mb-4">Long Description</h3>
            <p className="text-gray-700">{property.longDescription || "No description available."}</p>
          </div>
        </TabPanel>

        {/* ✅ Floor Plan Tab */}
        <TabPanel>
          {property.floorPlan ? (
            <img src={property.floorPlan} alt="Floor Plan" className="w-full h-96 object-contain rounded-lg" />
          ) : (
            <p>No floor plan available.</p>
          )}
        </TabPanel>

        {/* ✅ Google Map Tab */}
        <TabPanel>
          {property.googleMap ? (
            <iframe
              src={property.googleMap}
              title="Google Map"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen=""
              className="rounded-lg"
            ></iframe>
          ) : (
            <p>No Google Map available.</p>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
