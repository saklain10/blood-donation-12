
// src/pages/BlogDetailsPage.jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';

const BlogDetailsPage = () => {
  const blog = useLoaderData(); // Data loaded from router loader

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-600">Blog Post Not Found!</h2>
        <p className="text-gray-600 mt-2">The blog you are looking for might not exist or is not published yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mb-8 mt-20 max-w-4xl ">
      <img
        src={blog.thumbnailImage || "https://placehold.co/800x450/cccccc/ffffff?text=Blog+Thumbnail"}
        alt={blog.title}
        className="w-full h-auto max-h-96 object-cover rounded-lg mb-6 shadow-md"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <p className="text-gray-600 text-sm mb-6">
        By <span className="font-medium">{blog.authorName || 'Unknown Author'}</span> on {new Date(blog.createdAt).toLocaleDateString()}
        <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${
          blog.status === 'draft' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
        }`}>
          {blog.status.toUpperCase()}
        </span>
      </p>
      <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
};

export default BlogDetailsPage;
