
// src/pages/ContentManagement.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import useRole from '../hooks/useRole';
import { FaPlus, FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import AddBlogForm from '../components/AddBlogForm'; // Import the new AddBlogForm component

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [role, isRoleLoading] = useRole();
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false); // State for modal visibility

  const { data: blogs = [], isLoading, isError, error } = useQuery({
    queryKey: ['blogs', filterStatus],
    enabled: !isRoleLoading,
    queryFn: async () => {
      let url = '/get-all-blogs';
      const res = await axiosSecure.get(url);
      if (filterStatus === 'draft') {
        return res.data.filter(blog => blog.status === 'draft');
      } else if (filterStatus === 'published') {
        return res.data.filter(blog => blog.status === 'published');
      }
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
    onError: (err) => {
      console.error("Error fetching blogs:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load blog content. Please try again.',
      });
    }
  });

  const handlePublishToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    Swal.fire({
      title: `Are you sure you want to ${newStatus} this blog?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${newStatus} it!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/update-blog-status/${id}`, { status: newStatus });
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              `${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}!`,
              `Blog status updated to ${newStatus}.`,
              'success'
            );
            queryClient.invalidateQueries(['blogs', 'all']);
            queryClient.invalidateQueries(['blogs', 'draft']);
            queryClient.invalidateQueries(['blogs', 'published']);
            queryClient.invalidateQueries(['publishedBlogs']);
          } else {
            Swal.fire('Failed!', 'Could not update blog status.', 'error');
          }
        } catch (error) {
          console.error("Error updating blog status:", error);
          Swal.fire('Error!', error.response?.data?.message || 'Failed to update blog status.', 'error');
        }
      }
    });
  };

  const handleDeleteBlog = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/delete-blog/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire(
              'Deleted!',
              'The blog has been deleted.',
              'success'
            );
            queryClient.invalidateQueries(['blogs', 'all']);
            queryClient.invalidateQueries(['blogs', 'draft']);
            queryClient.invalidateQueries(['blogs', 'published']);
            queryClient.invalidateQueries(['publishedBlogs']);
          } else {
            Swal.fire('Failed!', 'Could not delete the blog.', 'error');
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire('Error!', error.response?.data?.message || 'Failed to delete blog.', 'error');
        }
      }
    });
  };

  const handleBlogAdded = () => {
    setIsAddBlogModalOpen(false); // Close the modal
    queryClient.invalidateQueries(['blogs']); // Invalidate blogs query to refetch data
    Swal.fire({
      icon: 'success',
      title: 'Blog Added!',
      text: 'New blog has been added successfully.',
    });
  };

  if (isLoading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading content.</h2>
        <p className="text-gray-600">Please try again later or check your permissions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
        {/* Changed Link to a button to open modal */}
        <button
          onClick={() => setIsAddBlogModalOpen(true)}
          className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition duration-200 shadow-lg"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="statusFilter" className="block text-gray-700 font-semibold">Filter by Status:</label>
        <select
          id="statusFilter"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">No blogs found. Start by adding a new one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <img
                src={blog.thumbnailImage || "https://placehold.co/400x250/cccccc/ffffff?text=Blog+Thumbnail"}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-2">Author: {blog.authorName || 'N/A'}</p>
                <p className="text-gray-600 text-sm mb-4">Published Date: {new Date(blog.createdAt).toLocaleDateString()}</p>
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    blog.status === 'draft' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                  }`}>
                    {blog.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex-grow"></div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {/* View Details */}
                  <Link
                    to={`/blog-details/${blog._id}`}
                    className="btn btn-sm p-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md tooltip"
                    data-tip="View Details"
                  >
                    <FaEye /> View
                  </Link>

                  {/* Edit Button (Admin & Volunteer) */}
                  {(role === 'admin' || role === 'volunteer') && (
                    <Link
                      to={`/dashboard/content-management/edit-blog/${blog._id}`}
                      className="btn btn-sm p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md tooltip"
                      data-tip="Edit Blog"
                    >
                      <FaEdit /> Edit
                    </Link>
                  )}

                  {/* Publish/Unpublish Button (Admin only) */}
                  {role === 'admin' && (
                    <button
                      onClick={() => handlePublishToggle(blog._id, blog.status)}
                      className={`btn btn-sm p-1 rounded-md tooltip ${
                        blog.status === 'draft' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                      data-tip={blog.status === 'draft' ? 'Publish Blog' : 'Unpublish Blog'}
                    >
                      {blog.status === 'draft' ? <FaCheckCircle /> : <FaTimesCircle />} {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                    </button>
                  )}

                  {/* Delete Button (Admin only) */}
                  {role === 'admin' && (
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="btn btn-sm p-1 bg-red-500 hover:bg-red-600 text-white rounded-md tooltip"
                      data-tip="Delete Blog"
                    >
                      <FaTrash /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Blog Modal */}
      {isAddBlogModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsAddBlogModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            >
              &times;
            </button>
            <AddBlogForm onBlogAdded={handleBlogAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
