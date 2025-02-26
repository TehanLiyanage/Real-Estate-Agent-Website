import React from 'react';
import Navbar from './Navbar';
import SearchForm from './SearchForm';

const Header = ({ onSearch }) => {
  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center flex flex-col items-center w-full overflow-hidden"
      style={{ backgroundImage: "url('/header_img.png')" }}
      id="Header"
    >
      <Navbar />
      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white">
        <h1 className="text-3xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20">
        The Future of Home Search Starts Here
        </h1>

      </div>

      {/* Add Search Form */}
      <div className="mt-10 w-full max-w-4xl px-6 py-8 rounded-lg shadow-lg">
        <SearchForm onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Header;
