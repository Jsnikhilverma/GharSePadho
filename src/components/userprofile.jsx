import { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    mobile_no: "",
    address: "",
    experience: 0,
    charge_hourly: 0,
    bio: "",
    subjects: [],
    qualifications: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newQualification, setNewQualification] = useState({
    qualification: "",
    institution: "",
    year: "",
  });
  const [teacherId, setTeacherId] = useState(null);

  // Image upload state
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Helper function to validate token format
  // Improved token decoding with better error handling

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userId = Cookies.get("userId");
        setTeacherId(userId);

        const formData = new FormData();
        formData.append("teacher_id", userId);

        const response = await axios.post(
          "https://gharsepadho.com/gsp_api/public/index.php/get_teacher_details",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (!response.data || !response.data.msg) {
          throw new Error("Invalid response structure from server");
        }

        const apiData = response.data.msg;

        let experience = 0;
        if (typeof apiData.experience === "string") {
          const match = apiData.experience.match(/\d+/);
          experience = match ? parseInt(match[0], 10) : 0;
        } else if (typeof apiData.experience === "number") {
          experience = apiData.experience;
        }

        const formattedData = {
          name: apiData.name || "",
          mobile_no: apiData.mobile || "",
          address: "", // Not present in response
          experience: experience,
          charge_hourly: 0, // Not present in response
          bio: "", // Not present in response
          subjects: Array.isArray(apiData.subjects) ? apiData.subjects : [],
          qualifications: [],
          profile_image: apiData.profile_img || null,
        };

        setUserData(formattedData);
        setEditedData(formattedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch user data"
        );
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const openImageUploadModal = () => setShowImageUploadModal(true);
  const closeImageUploadModal = () => {
    setShowImageUploadModal(false);
    setSelectedFile(null);
    setUploadError(null);
    setUploadSuccess(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setUploadError("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setUploadError("File size should be less than 2MB");
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("teacher_id", teacherId);
      formData.append("image", selectedFile);

      const response = await axios.post(
        "https://gharsepadho.com/gsp_api/public/index.php/updateTeacherImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data.status === 200 || data.status === "success") {
        setUploadSuccess(true);
        // Update the profile image in the local state
        setUserData((prev) => ({
          ...prev,
          profile_image: URL.createObjectURL(selectedFile),
        }));
        setEditedData((prev) => ({
          ...prev,
          profile_image: URL.createObjectURL(selectedFile),
        }));
        setSelectedFile(null);
        // Close the modal after 2 seconds
        setTimeout(() => {
          setShowImageUploadModal(false);
        }, 2000);
      } else {
        setUploadError(data.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setUploadError(
        err.response?.data?.message || err.message || "Failed to upload image"
      );
    } finally {
      setUploading(false);
    }
  };


  const triggerImageInput = () => {
    openImageUploadModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...editedData.subjects];
    newSubjects[index] = value;
    setEditedData((prev) => ({
      ...prev,
      subjects: newSubjects,
    }));
  };

  const addSubject = () => {
    setEditedData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, ""],
    }));
  };

  const removeSubject = (index) => {
    const newSubjects = [...editedData.subjects];
    newSubjects.splice(index, 1);
    setEditedData((prev) => ({
      ...prev,
      subjects: newSubjects,
    }));
  };

  const handleQualificationChange = (index, field, value) => {
    const newQualifications = [...editedData.qualifications];
    newQualifications[index] = {
      ...newQualifications[index],
      [field]: value,
    };
    setEditedData((prev) => ({
      ...prev,
      qualifications: newQualifications,
    }));
  };

  const addQualification = () => {
    if (
      newQualification.qualification &&
      newQualification.institution &&
      newQualification.year
    ) {
      setEditedData((prev) => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification],
      }));
      setNewQualification({
        qualification: "",
        institution: "",
        year: "",
      });
    }
  };

  const removeQualification = (index) => {
    const newQualifications = [...editedData.qualifications];
    newQualifications.splice(index, 1);
    setEditedData((prev) => ({
      ...prev,
      qualifications: newQualifications,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = Cookies.get("token");

      if (!token || !teacherId) {
        throw new Error("Authentication token or teacher ID not found");
      }

      // Prepare the data for the API request
      const requestData = {
        teacher_id: teacherId,
        name: editedData.name,
        mobile_no: editedData.mobile_no,
        address: editedData.address,
        experience: editedData.experience,
        charge_hourly: editedData.charge_hourly,
        bio: editedData.bio,
        subjects: editedData.subjects,
        qualifications: editedData.qualifications,
      };

      const response = await axios.post(
        "https://gharsepadho.com/gsp_api/public/index.php/update_teacher_details",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.status === "success") {
        setUserData({ ...editedData });
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        setIsModalOpen(false);
      } else {
        throw new Error(response.data?.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to update profile"
      );
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
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer"
                onClick={openImageUploadModal}
              >
                {userData?.profile_image ? (
                  <img
                    src={userData.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <button
                onClick={triggerImageInput}
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 shadow-md hover:bg-blue-600 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path

                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
             
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {userData?.name || "User Profile"}
              </h2>
              <p className="text-gray-600">
                {userData?.bio || "No bio provided"}
              </p>
            </div>
          </div>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Edit Profile
          </button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Basic Information
              </h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Mobile:</span>{" "}
                  {userData?.mobile_no || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {userData?.address || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Experience:</span>{" "}
                  {userData?.experience || 0} years
                </p>
                <p>
                  <span className="font-medium">Hourly Rate:</span> ₹
                  {userData?.charge_hourly || 0}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Subjects</h3>
              <div className="mt-2">
                {userData?.subjects?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userData.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
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
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Qualifications
              </h3>
              <div className="mt-2">
                {userData?.qualifications?.length > 0 ? (
                  <div className="space-y-4">
                    {userData.qualifications.map((qual, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p>
                          <span className="font-medium">Degree:</span>{" "}
                          {qual.qualification}
                        </p>
                        <p>
                          <span className="font-medium">Institution:</span>{" "}
                          {qual.institution}
                        </p>
                        <p>
                          <span className="font-medium">Year:</span> {qual.year}
                        </p>
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
                <h3 className="text-xl font-bold text-gray-800">
                  Edit Profile
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Name
                      </label>
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
                      <label className="block text-gray-700 font-medium mb-2">
                        Mobile Number
                      </label>
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
                      <label className="block text-gray-700 font-medium mb-2">
                        Address
                      </label>
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
                      <label className="block text-gray-700 font-medium mb-2">
                        Experience (years)
                      </label>
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
                      <label className="block text-gray-700 font-medium mb-2">
                        Hourly Charge (₹)
                      </label>
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
                      <label className="block text-gray-700 font-medium mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={editedData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Subjects
                      </label>
                      <div className="space-y-2">
                        {editedData.subjects?.map((subject, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={subject}
                              onChange={(e) =>
                                handleSubjectChange(index, e.target.value)
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeSubject(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSubject}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add Subject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Qualifications
                  </h3>
                  <div className="space-y-4 mb-4">
                    {editedData.qualifications?.map((qual, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                              Qualification
                            </label>
                            <input
                              type="text"
                              value={qual.qualification}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "qualification",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                              Institution
                            </label>
                            <input
                              type="text"
                              value={qual.institution}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "institution",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                              Year
                            </label>
                            <input
                              type="text"
                              value={qual.year}
                              onChange={(e) =>
                                handleQualificationChange(
                                  index,
                                  "year",
                                  e.target.value
                                )
                              }
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove Qualification
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">
                      Add New Qualification
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Qualification
                        </label>
                        <input
                          type="text"
                          value={newQualification.qualification}
                          onChange={(e) =>
                            setNewQualification({
                              ...newQualification,
                              qualification: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={newQualification.institution}
                          onChange={(e) =>
                            setNewQualification({
                              ...newQualification,
                              institution: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={newQualification.year}
                          onChange={(e) =>
                            setNewQualification({
                              ...newQualification,
                              year: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addQualification}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm transition duration-200"
                      disabled={
                        !newQualification.qualification ||
                        !newQualification.institution ||
                        !newQualification.year
                      }
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
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageUploadModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Update Profile Image
                </h3>
                <button
                  onClick={closeImageUploadModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Image (JPEG, PNG, max 2MB)
                </label>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100"
                />
              </div>

              {selectedFile && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Selected file: {selectedFile.name}
                  </p>
                  <div className="mt-2 w-32 h-32 border border-gray-200 rounded-md overflow-hidden mx-auto">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {uploadError}
                </div>
              )}

              {uploadSuccess && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                  Image uploaded successfully! The changes will be visible
                  shortly.
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeImageUploadModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleImageUpload}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={uploading || !selectedFile}
                >
                  {uploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload Image"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
