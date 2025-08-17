import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2024 Store Rating System. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-gray-300">Terms of Service</a>
            <a href="#" className="text-sm hover:text-gray-300">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;