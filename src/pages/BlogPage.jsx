
// src/pages/BlogPage.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], isLoading, isError, error } = useQuery({
    queryKey: ['publishedBlogs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/published-blogs'); // Endpoint to get only published blogs
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    onError: (err) => {
      console.error("Error fetching published blogs:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load blog posts. Please try again.',
      });
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading blog posts.</h2>
        <p className="text-gray-600">Details: {error?.message || 'Unknown error'}</p>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen mb-6 mt-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Blog Posts</h1>

      {blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-2xl">No published blog posts available yet.</p>
          <p className="text-lg mt-2">Check back later for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src={blog.thumbnailImage || "https://placehold.co/400x250/cccccc/ffffff?text=Blog+Thumbnail"}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  By <span className="font-medium">{blog.authorName || 'Unknown Author'}</span> on {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                {/* Display a snippet of the content, remove HTML tags */}
                <p className="text-gray-700 mb-5 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content.replace(/<[^>]*>?/gm, '') }}></p>
                <Link
                  to={`/blog-details/${blog._id}`}
                  className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
