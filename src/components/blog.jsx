import React, { useState, useEffect } from 'react';
import {
  BookmarkIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

const EdutechBlogPlatform = () => {
  const [activeBlog, setActiveBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://gharsepadho.com/gsp_api/public/index.php/get_blog_posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'page=1'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        if (data.status === 200) {
          // Transform API data to match our expected format
          const formattedBlogs = data.msg.map((blog, index) => ({
            id: blog.id,
            title: blog.title,
            excerpt: blog.description.length > 150 
              ? `${blog.description.substring(0, 150)}...` 
              : blog.description,
            author: "Admin", // Default author since API doesn't provide
            date: new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            readTime: `${Math.ceil(blog.description.length / 500)} min read`,
            category: "Education", // Default category
            icon: <AcademicCapIcon className="h-6 w-6 text-blue-500" />,
            image: blog.blog_img,
            content: `
              <h2 class="text-2xl font-bold mb-6">${blog.title}</h2>
              <img src="${blog.blog_img}" alt="${blog.title}" class="w-full h-auto my-8 rounded-lg" />
              <p class="mb-4">${blog.description.replace(/\n/g, '</p><p class="mb-4">')}</p>
            `,
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 100),
            isBookmarked: false,
            isLiked: false
          }));
          
          setBlogs(formattedBlogs);
        } else {
          throw new Error(data.msg || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle like status
  const toggleLike = (blogId) => {
    if (activeBlog && activeBlog.id === blogId) {
      setActiveBlog({
        ...activeBlog,
        isLiked: !activeBlog.isLiked,
        likes: activeBlog.isLiked ? activeBlog.likes - 1 : activeBlog.likes + 1
      });
    }
    
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === blogId) {
        return {
          ...blog,
          isLiked: !blog.isLiked,
          likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1
        };
      }
      return blog;
    });
    setBlogs(updatedBlogs);
  };

  // Toggle bookmark status
  const toggleBookmark = (blogId) => {
    if (activeBlog && activeBlog.id === blogId) {
      setActiveBlog({
        ...activeBlog,
        isBookmarked: !activeBlog.isBookmarked
      });
    }
    
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === blogId) {
        return {
          ...blog,
          isBookmarked: !blog.isBookmarked
        };
      }
      return blog;
    });
    setBlogs(updatedBlogs);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading blogs</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeBlog ? (
          // Single Blog View
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Blog Header */}
            <div className="relative">
              <img 
                src={activeBlog.image} 
                alt={activeBlog.title} 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full mb-2">
                      {activeBlog.icon}
                      <span className="ml-2">{activeBlog.category}</span>
                    </span>
                    <h1 className="text-3xl font-bold mb-2">{activeBlog.title}</h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 mr-1" />
                        <span>{activeBlog.author}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 mr-1" />
                        <span>{activeBlog.date} • {activeBlog.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveBlog(null)}
                    className="flex items-center justify-center p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm border border-white border-opacity-30"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-8">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: activeBlog.content }}
              ></div>

              {/* Blog Footer */}
              <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap justify-between items-center">
                <div className="flex space-x-4 mb-4 sm:mb-0">
                  <button 
                    onClick={() => toggleLike(activeBlog.id)}
                    className={`flex items-center space-x-1 ${activeBlog.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  >
                    <HeartIcon className="h-5 w-5" />
                    <span>{activeBlog.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <span>{activeBlog.comments}</span>
                  </button>
                  <button 
                    onClick={() => toggleBookmark(activeBlog.id)}
                    className={`flex items-center space-x-1 ${activeBlog.isBookmarked ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                  >
                    <BookmarkIcon className="h-5 w-5" />
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {activeBlog.date}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Blog Listing View
          <div>
            {/* Featured Blog */}
            {filteredBlogs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2">
                      <img 
                        src={filteredBlogs[0].image} 
                        alt={filteredBlogs[0].title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-8 md:w-1/2">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                          {filteredBlogs[0].icon}
                          <span className="ml-2">{filteredBlogs[0].category}</span>
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{filteredBlogs[0].readTime}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{filteredBlogs[0].title}</h2>
                      <p className="text-gray-600 mb-4">{filteredBlogs[0].excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{filteredBlogs[0].author}</p>
                            <p className="text-sm text-gray-500">{filteredBlogs[0].date}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveBlog(filteredBlogs[0])}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Read Article
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* All Blogs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full">
                          {blog.icon}
                          <span className="ml-2">{blog.category}</span>
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{blog.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="ml-2">
                            <p className="text-xs font-medium text-gray-900">{blog.author}</p>
                            <p className="text-xs text-gray-500">{blog.date}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveBlog(blog)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Read
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EdutechBlogPlatform;