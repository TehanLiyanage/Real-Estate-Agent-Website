import React, { useState } from 'react';
import { Combobox, NumberPicker, DatePicker } from 'react-widgets';
import 'react-widgets/styles.css';

const SearchForm = ({ onSearch }) => {
  const initialCriteria = {
    type: 'Any',
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    postcode: '',
    added: null,
  };

  const [criteria, setCriteria] = useState(initialCriteria);
  const [error, setError] = useState('');

  const handleChange = (name, value) => {
    setCriteria({ ...criteria, [name]: value });
  };

  const validateCriteria = () => {
    const postcodePattern = /^([A-Z]{1,2}[0-9]{1,2}[A-Z]?[ ]?[0-9]?[A-Z]{0,2})$/i;

    if (criteria.minPrice && criteria.maxPrice && criteria.minPrice > criteria.maxPrice) {
      setError('Minimum price cannot be greater than maximum price.');
      return false;
    }

    if (criteria.minBedrooms && criteria.maxBedrooms && criteria.minBedrooms > criteria.maxBedrooms) {
      setError('Minimum bedrooms cannot be greater than maximum bedrooms.');
      return false;
    }

    if (criteria.postcode && !postcodePattern.test(criteria.postcode)) {
      setError('Invalid postcode format.');
      return false;
    }

    setError('');
    return true;
  };

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateCriteria()) {
      const formattedCriteria = {
        ...criteria,
        added: formatDate(criteria.added), // Format the date
      };

      const activeCriteria = Object.fromEntries(
        Object.entries(formattedCriteria).filter(([key, value]) => value !== null && value !== '' && value !== 'Any')
      );

      onSearch(activeCriteria);
    }
  };

  const handleScrollToFavorites = () => {
    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection) {
      favoritesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlereset = () =>{
    setCriteria(initialCriteria);
    setError('');
    onSearch({});
  }

  const propertyTypes = ['Any', 'House', 'Flat'];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-7 w-full max-w-xlg mx-auto rounded-lg shadow-lg flex flex-col gap-2"
    >
      <h2 className="text-center text-3xl font-bold mb-4">Find Your Perfect Property</h2>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-600">Type:</label>
        <Combobox
          data={propertyTypes}
          value={criteria.type}
          onChange={(value) => handleChange('type', value)}
          className="mt-1 block w-full rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date Added:</label>
        <DatePicker
          value={criteria.added}
          onChange={(value) => handleChange('added', value)}
          placeholder="Select a date"
          className="mt-1 block w-full rounded-md shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600">Min Price :</label>
          <NumberPicker
            value={criteria.minPrice}
            onChange={(value) => handleChange('minPrice', value)}
            placeholder="Enter minimum price"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Max Price :</label>
          <NumberPicker
            value={criteria.maxPrice}
            onChange={(value) => handleChange('maxPrice', value)}
            placeholder="Enter maximum price"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Min Bedrooms:</label>
          <NumberPicker
            value={criteria.minBedrooms}
            onChange={(value) => handleChange('minBedrooms', value)}
            placeholder="Enter minimum bedrooms"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Max Bedrooms:</label>
          <NumberPicker
            value={criteria.maxBedrooms}
            onChange={(value) => handleChange('maxBedrooms', value)}
            placeholder="Enter maximum bedrooms"
            min={0}
            className="mt-1 block w-full rounded-md shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Postcode:</label>
        <Combobox
          data={['BR5', 'BR6', 'SL1', 'RG1', 'CB1', 'OX1', 'BN1']}
          value={criteria.postcode}
          onChange={(value) => handleChange('postcode', value)}
          placeholder="Enter postcode (e.g., NW1)"
          className="mt-1 block w-full rounded-md shadow-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition flex-1"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handlereset}
          className="bg-emerald-400 text-white py-2 px-3 rounded-md hover:bg-green-600 transition flex-shrink"
        >
          Reset All
        </button>
      </div>
    </form>
  );
};

export default SearchForm;



//SCROLL TO FAVORITES BUTTON

  // const handleScrollToFavorites = () => {
  //   const favoritesSection = document.getElementById('favorites');
  //   if (favoritesSection) {
  //     favoritesSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

        // <button
        //   type="button"
        //   onClick={handleScrollToFavorites}
        //   className="bg-emerald-400 text-white py-2 px-3 rounded-md hover:bg-green-600 transition flex-shrink"
        // >
        //   Favorites
        // </button>

// ---------------------------------------------------------------------------------------------------------------------