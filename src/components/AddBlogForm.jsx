// src/components/AddBlogForm.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import JoditEditor from 'jodit-react'; // Import JoditEditor

const AddBlogForm = ({ onBlogAdded }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();

  const editor = useRef(null);
  const [content, setContent] = useState(''); // State for Jodit Editor content
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (user) {
      setValue('authorName', user.displayName || '');
      setValue('authorEmail', user.email || '');
    }
  }, [user, setValue]);


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const blogData = {
        title: data.title,
        thumbnailImage: data.thumbnailImage,
        content: content, // Use content from Jodit Editor state
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        status: 'draft', // Default status for new blogs
      };

      const res = await axiosSecure.post("/add-blog", blogData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Blog Created!',
          text: 'Your blog has been successfully created as a draft.',
        });
        reset(); // Clear form fields
        setContent(''); // Clear Jodit Editor content
        if (onBlogAdded) {
            onBlogAdded(); // Notify parent component that blog was added
        }
      } else {
        Swal.fire('Failed!', 'Could not create blog. Please try again.', 'error');
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to create blog.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Blog Post</h1>

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

        {/* Hidden fields for author info */}
        <input type="hidden" {...register("authorName")} />
        <input type="hidden" {...register("authorEmail")} />

        {/* Create Button */}
        <button
          type="submit"
          className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Creating Blog...
            </>
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
