import React, { useState } from 'react';
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
  
  // Edutech blog data
  const blogs = [
    {
      id: 1,
      title: "Revolutionizing Education with AI-Powered Learning Systems",
      excerpt: "Explore how artificial intelligence is transforming personalized learning and adaptive education platforms.",
      author: "Dr. Sarah Chen",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "Artificial Intelligence",
      icon: <CpuChipIcon className="h-6 w-6 text-blue-500" />,
      image: "/blog1.jpg",
      content: `
        <h2 class="text-2xl font-bold mb-6">The AI Education Revolution</h2>
        <p class="mb-4">Artificial Intelligence is reshaping the educational landscape by enabling personalized learning experiences at scale. Modern AI systems can analyze student performance in real-time, adapting content delivery to match individual learning styles and paces.</p>
        
        <div class="my-8 p-6 bg-blue-50 border-l-4 border-blue-400">
          <p class="italic text-blue-800">"AI in education isn't about replacing teachers - it's about empowering them with tools to reach every student more effectively."</p>
        </div>
        
        <h3 class="text-xl font-bold mt-8 mb-4">Key Applications in Education</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Adaptive learning platforms that adjust difficulty in real-time</li>
          <li>Intelligent tutoring systems with natural language processing</li>
          <li>Automated grading and feedback for written assignments</li>
          <li>Predictive analytics to identify at-risk students</li>
          <li>Virtual reality simulations for immersive learning</li>
        </ul>
        
        <img src="/ai-classroom.jpg" alt="AI in classroom" class="w-full h-auto my-8 rounded-lg" />
        
        <h3 class="text-xl font-bold mt-8 mb-4">Implementation Roadmap</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-bold mb-2">Phase 1: Foundation</h4>
            <p>Data collection infrastructure and basic analytics</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-bold mb-2">Phase 2: Personalization</h4>
            <p>Adaptive learning algorithms and recommendation engines</p>
          </div>
        </div>
      `,
      likes: 1243,
      comments: 42,
      isBookmarked: false,
      isLiked: false
    },
    {
      id: 2,
      title: "Cybersecurity in Education: Protecting Digital Learning Environments",
      excerpt: "Essential strategies for securing educational institutions against growing digital threats.",
      author: "Mark Johnson",
      date: "June 2, 2023",
      readTime: "12 min read",
      category: "Cybersecurity",
      icon: <ShieldCheckIcon className="h-6 w-6 text-green-500" />,
      image: "/cybersecurity.jpeg",
      content: `
        <h2 class="text-2xl font-bold mb-6">The Growing Threat Landscape</h2>
        <p class="mb-4">Educational institutions have become prime targets for cyberattacks, with sensitive student data and often underprotected networks. The shift to remote learning has expanded the attack surface, requiring new security paradigms.</p>
        
        <img src="/cyber-threats.jpg" alt="Cybersecurity threats" class="w-full h-auto my-8 rounded-lg" />
        
        <h3 class="text-xl font-bold mt-8 mb-4">Critical Security Measures</h3>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solution</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Implementation</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Network Security</td>
                <td class="px-6 py-4 whitespace-nowrap">Zero Trust Architecture</td>
                <td class="px-6 py-4">Require verification for all users and devices</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Data Protection</td>
                <td class="px-6 py-4 whitespace-nowrap">End-to-End Encryption</td>
                <td class="px-6 py-4">Protect data in transit and at rest</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Access Control</td>
                <td class="px-6 py-4 whitespace-nowrap">Multi-Factor Authentication</td>
                <td class="px-6 py-4">Implement across all systems</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      likes: 892,
      comments: 31,
      isBookmarked: false,
      isLiked: false
    },
    {
      id: 3,
      title: "IoT in Smart Classrooms: Creating Connected Learning Experiences",
      excerpt: "How Internet of Things technology is enabling interactive and data-driven educational environments.",
      author: "Priya Patel",
      date: "June 10, 2023",
      readTime: "15 min read",
      category: "IoT",
      icon: <CubeIcon className="h-6 w-6 text-purple-500" />,
      image: "/iolab.jpg",
      content: `
        <h2 class="text-2xl font-bold mb-6">The Connected Classroom</h2>
        <p class="mb-4">IoT technology transforms physical learning spaces into interactive, responsive environments that enhance engagement and provide valuable usage analytics. From smart whiteboards to environmental sensors, connected devices are redefining the classroom experience.</p>
        
        <div class="my-8 p-6 bg-purple-50 border-l-4 border-purple-400">
          <p class="italic text-purple-800">"IoT in education goes beyond gadgets - it creates ecosystems where physical and digital learning tools work in harmony."</p>
        </div>
        
        <h3 class="text-xl font-bold mt-8 mb-4">Key IoT Applications</h3>
        
        <div class="grid md:grid-cols-3 gap-6 my-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-bold mb-2">1. Attendance Tracking</h4>
            <p>RFID tags automate attendance and location monitoring</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-bold mb-2">2. Environmental Control</h4>
            <p>Smart sensors optimize lighting, temperature, and air quality</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-bold mb-2">3. Equipment Monitoring</h4>
            <p>Track usage and maintenance needs of educational devices</p>
          </div>
        </div>
        
        <img src="/iot-devices.jpg" alt="IoT devices in classroom" class="w-full h-auto my-8 rounded-lg" />
      `,
      likes: 1567,
      comments: 87,
      isBookmarked: false,
      isLiked: false
    },
    {
      id: 4,
      title: "Blockchain for Academic Credentials: Ending Degree Fraud",
      excerpt: "How decentralized ledger technology is bringing transparency and security to educational certifications.",
      author: "David Zhang",
      date: "June 18, 2023",
      readTime: "10 min read",
      category: "Blockchain",
      icon: <CubeIcon className="h-6 w-6 text-amber-500" />,
      image: "/blockchain.jpg",
      content: `
        <h2 class="text-2xl font-bold mb-6">The Trust Problem in Academic Credentials</h2>
        <p class="mb-4">With increasing cases of degree fraud and credential misrepresentation, blockchain technology offers an immutable, verifiable solution for academic records. Institutions worldwide are adopting decentralized systems to issue and verify qualifications.</p>
        
        <h3 class="text-xl font-bold mt-8 mb-4">Blockchain Benefits</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Tamper-proof record of academic achievements</li>
          <li>Instant verification by employers</li>
          <li>Reduced administrative overhead</li>
          <li>Global standardization of credentials</li>
          <li>Student ownership of academic records</li>
        </ul>
        
        <img src="/blockchain-diploma.jpg" alt="Blockchain diploma" class="w-full h-auto my-8 rounded-lg" />
        
        <h3 class="text-xl font-bold mt-8 mb-4">Implementation Examples</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-bold mb-2">MIT Digital Diplomas</h4>
            <p>Pioneering blockchain-based credentialing since 2017</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-bold mb-2">European Qualifications Passport</h4>
            <p>Cross-border credential verification system</p>
          </div>
        </div>
      `,
      likes: 1120,
      comments: 56,
      isBookmarked: false,
      isLiked: false
    }
  ];

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
    // In a real app, you would update your state management here
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
    // In a real app, you would update your state management here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        {/* <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Learning Technologies</h2>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800">
              <CpuChipIcon className="h-5 w-5 mr-2" />
              AI & Machine Learning
            </button>
            <button className="flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Cybersecurity
            </button>
            <button className="flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800">
              <CubeIcon className="h-5 w-5 mr-2" />
              IoT
            </button>
            <button className="flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-800">
              <CubeIcon className="h-5 w-5 mr-2" />
              Blockchain
            </button>
          </div>
        </div> */}

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
                {filteredBlogs.slice(1).map((blog) => (
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

      {/* Footer */}
    
    </div>
  );
};

export default EdutechBlogPlatform;