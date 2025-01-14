import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-4">The page you are looking for doesn't exist.</p>
      <Link
        to="/login"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFoundPage;
