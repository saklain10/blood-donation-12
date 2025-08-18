// src/pages/EditBlogPage.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';
import JoditEditor from 'jodit-react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useRole from '../hooks/useRole'; // Import useRole

const EditBlogPage = () => {
  const blog = useLoaderData(); // Blog data loaded from router loader
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [role, isRoleLoading] = useRole();

  const editor = useRef(null);
  const [content, setContent] = useState(''); // State for Jodit Editor content
  const [isUpdating, setIsUpdating] = useState(false);

  // Jodit Editor config
  const config = {
    readonly: false,
    height: 400,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'align', 'link', 'image', 'table', '|',
      'hr', 'eraser', 'fullsize', 'print',
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title || '',
        thumbnailImage: blog.thumbnailImage || '',
        authorName: blog.authorName || '',
        authorEmail: blog.authorEmail || '',
      });
      setContent(blog.content || ''); // Set Jodit Editor content
    }
  }, [blog, reset]);


  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const blogData = {
        title: data.title,
        thumbnailImage: data.thumbnailImage,
        content: content, // Use content from Jodit Editor state
      };

      const res = await axiosSecure.patch(`/edit-blog/${blog._id}`, blogData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Blog Updated!',
          text: 'Your blog has been successfully updated.',
        });
        navigate('/dashboard/content-management'); // Redirect after successful update
      } else {
        Swal.fire('Failed!', 'No changes detected or update failed.', 'info');
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to update blog.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (!blog) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Blog Not Found!</h2>
        <p className="text-gray-600">The blog you are trying to edit does not exist or you do not have permission.</p>
      </div>
    );
  }

  // Permission check: Admin can edit any blog. Volunteer can only edit their own blogs.
  // This logic ensures that only authorized users can proceed to the form.
  if (role !== 'admin' && !(role === 'volunteer' && user?.email === blog.authorEmail)) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
        <p className="text-gray-600">You are not authorized to edit this blog post.</p>
      </div>
    );
  }


  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Edit Blog Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Thumbnail Image URL */}
        <div>
          <label htmlFor="thumbnailImage" className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image URL</label>
          <input
            type="text"
            id="thumbnailImage"
            {...register("thumbnailImage")}
            placeholder="Enter thumbnail image URL (e.g., from ImageBB)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Blog Content (Rich Text Editor) */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Blog Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={newContent => setContent(newContent)}
            onChange={newContent => {}}
          />
        </div>

        {/* Hidden fields for author info (read-only for display) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                <input
                    type="text"
                    value={blog.authorName || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Email</label>
                <input
                    type="email"
                    value={blog.authorEmail || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
            </div>
        </div>


        {/* Update Button */}
        <button
          type="submit"
          className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center w-full"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Updating Blog...
            </>
          ) : (
            "Update Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
