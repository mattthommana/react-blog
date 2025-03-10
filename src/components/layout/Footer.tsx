import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container px-8 py-5 mx-auto xl:px-5 max-w-screen-lg">
      <div className="flex flex-col items-center py-6">
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()} Matthew Thommana. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;