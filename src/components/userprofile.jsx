import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    mobile_no: '',
    address: '',
    experience: 0,
    charge_hourly: 0,
    bio: '',
    subjects: [],
    qualifications: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newQualification, setNewQualification] = useState({
    qualification: '',
    institution: '',
    year: ''
  });

  // Helper function to extract user ID from JWT token
  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userid || decodedToken.id; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const token = Cookies.get('token');
         const userId = Cookies.get('id');

    

        const response = await axios.get(`http://127.0.0.1:8080/tuition_api/api/teachers/get_by_id.php?id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.data || !response.data.data) {
          throw new Error('Invalid response structure from server');
        }
        
        const apiData = response.data.data;
        
        const formattedData = {
          name: apiData.name || '',
          mobile_no: apiData.mobile_no || '',
          address: apiData.address || '',
          experience: apiData.experience || 0,
          charge_hourly: parseFloat(apiData.charge_hourly) || 0,
          bio: apiData.bio || '',
          subjects: Array.isArray(apiData.subjects) ? apiData.subjects : [],
          qualifications: Array.isArray(apiData.qualifications) ? apiData.qualifications : []
        };
        
        setUserData(formattedData);
        setEditedData(formattedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch user data');
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...editedData.subjects];
    newSubjects[index] = value;
    setEditedData(prev => ({
      ...prev,
      subjects: newSubjects
    }));
  };

  const addSubject = () => {
    setEditedData(prev => ({
      ...prev,
      subjects: [...prev.subjects, '']
    }));
  };

  const removeSubject = (index) => {
    const newSubjects = [...editedData.subjects];
    newSubjects.splice(index, 1);
    setEditedData(prev => ({
      ...prev,
      subjects: newSubjects
    }));
  };

  const handleQualificationChange = (index, field, value) => {
    const newQualifications = [...editedData.qualifications];
    newQualifications[index] = {
      ...newQualifications[index],
      [field]: value
    };
    setEditedData(prev => ({
      ...prev,
      qualifications: newQualifications
    }));
  };

  const addQualification = () => {
    if (newQualification.qualification && newQualification.institution && newQualification.year) {
      setEditedData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification]
      }));
      setNewQualification({
        qualification: '',
        institution: '',
        year: ''
      });
    }
  };

  const removeQualification = (index) => {
    const newQualifications = [...editedData.qualifications];
    newQualifications.splice(index, 1);
    setEditedData(prev => ({
      ...prev,
      qualifications: newQualifications
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = Cookies.get('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.put(
        'http://127.0.0.1:8080/tuition_api/api/teachers/update_profile.php',
        editedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data && response.data.status === 'success') {
        setUserData({...editedData});
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setIsModalOpen(false);
      } else {
        throw new Error(response.data?.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Edit Profile
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Name:</span> {userData?.name || 'Not provided'}</p>
                <p><span className="font-medium">Mobile:</span> {userData?.mobile_no || 'Not provided'}</p>
                <p><span className="font-medium">Address:</span> {userData?.address || 'Not provided'}</p>
                <p><span className="font-medium">Experience:</span> {userData?.experience || 0} years</p>
                <p><span className="font-medium">Hourly Rate:</span> ₹{userData?.charge_hourly || 0}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Subjects</h3>
              <div className="mt-2">
                {userData?.subjects?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userData.subjects.map((subject, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No subjects listed</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Bio</h3>
              <p className="mt-2 text-gray-600">
                {userData?.bio || 'No bio provided'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Qualifications</h3>
              <div className="mt-2">
                {userData?.qualifications?.length > 0 ? (
                  <div className="space-y-4">
                    {userData.qualifications.map((qual, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p><span className="font-medium">Degree:</span> {qual.qualification}</p>
                        <p><span className="font-medium">Institution:</span> {qual.institution}</p>
                        <p><span className="font-medium">Year:</span> {qual.year}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No qualifications listed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                      <input
                        type="text"
                        name="mobile_no"
                        value={editedData.mobile_no}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={editedData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Experience (years)</label>
                      <input
                        type="number"
                        name="experience"
                        value={editedData.experience}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Hourly Charge (₹)</label>
                      <input
                        type="number"
                        name="charge_hourly"
                        value={editedData.charge_hourly}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={editedData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Subjects</label>
                      <div className="space-y-2">
                        {editedData.subjects?.map((subject, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={subject}
                              onChange={(e) => handleSubjectChange(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeSubject(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSubject}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Subject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Qualifications</h3>
                  <div className="space-y-4 mb-4">
                    {editedData.qualifications?.map((qual, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Qualification</label>
                            <input
                              type="text"
                              value={qual.qualification}
                              onChange={(e) => handleQualificationChange(index, 'qualification', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Institution</label>
                            <input
                              type="text"
                              value={qual.institution}
                              onChange={(e) => handleQualificationChange(index, 'institution', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Year</label>
                            <input
                              type="text"
                              value={qual.year}
                              onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove Qualification
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Add New Qualification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Qualification</label>
                        <input
                          type="text"
                          value={newQualification.qualification}
                          onChange={(e) => setNewQualification({...newQualification, qualification: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Institution</label>
                        <input
                          type="text"
                          value={newQualification.institution}
                          onChange={(e) => setNewQualification({...newQualification, institution: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Year</label>
                        <input
                          type="text"
                          value={newQualification.year}
                          onChange={(e) => setNewQualification({...newQualification, year: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addQualification}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm transition duration-200"
                      disabled={!newQualification.qualification || !newQualification.institution || !newQualification.year}
                    >
                      Add Qualification
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;