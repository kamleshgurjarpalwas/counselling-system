import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBranchPage = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    totalSeats: '',
    currentYear: new Date().getFullYear(),
    homeState: {
      gen: { totalSeats: '', openingRank: '', closingRank: '' },
      obc: { totalSeats: '', openingRank: '', closingRank: '' },
      ews: { totalSeats: '', openingRank: '', closingRank: '' },
      sc: { totalSeats: '', openingRank: '', closingRank: '' },
      st: { totalSeats: '', openingRank: '', closingRank: '' }
    },
    otherState: {
      gen: { totalSeats: '', openingRank: '', closingRank: '' },
      obc: { totalSeats: '', openingRank: '', closingRank: '' },
      ews: { totalSeats: '', openingRank: '', closingRank: '' },
      sc: { totalSeats: '', openingRank: '', closingRank: '' },
      st: { totalSeats: '', openingRank: '', closingRank: '' }
    }
  });

  const navigate = useNavigate();

  // Fetch all branches on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/branches/');
        setBranches(response.data.data);
      
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch branches');
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (stateType, category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [stateType]: {
        ...prev[stateType],
        [category]: {
          ...prev[stateType][category],
          [field]: value === '' ? null : value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedBranch) {
      setError('Please select a branch');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare the data for submission
      const submissionData = {
        branchId: selectedBranch,
        totalSeats: formData.totalSeats,
        homeState: {
          gen: [{
            year: formData.currentYear,
            totalSeats: formData.homeState.gen.totalSeats,
            openingRank: formData.homeState.gen.openingRank || null,
            closingRank: formData.homeState.gen.closingRank || null
          }],
          // Repeat for other categories...
          obc: [{
            year: formData.currentYear,
            totalSeats: formData.homeState.obc.totalSeats,
            openingRank: formData.homeState.obc.openingRank || null ,
            closingRank: formData.homeState.obc.closingRank || null
          }],
          ews: [{
            year: formData.currentYear,
            totalSeats: formData.homeState.ews.totalSeats,
            openingRank: formData.homeState.ews.openingRank || null,
            closingRank: formData.homeState.ews.closingRank || null
          }],
          sc: [{
            year: formData.currentYear,
            totalSeats: formData.homeState.sc.totalSeats,
            openingRank: formData.homeState.sc.openingRank || null,
            closingRank: formData.homeState.sc.closingRank || null
          }],
          st: [{
            year: formData.currentYear,
            totalSeats: formData.homeState.st.totalSeats,
            openingRank: formData.homeState.st.openingRank || null,
            closingRank: formData.homeState.st.closingRank || null
          }]
        },
        otherState: {
          gen: [{
            year: formData.currentYear,
            totalSeats: formData.otherState.gen.totalSeats,
            openingRank: formData.otherState.gen.openingRank || null,
            closingRank: formData.otherState.gen.closingRank || null
          }],
          // Repeat for other categories...
          obc: [{
            year: formData.currentYear,
            totalSeats: formData.otherState.obc.totalSeats,
            openingRank: formData.otherState.obc.openingRank || null,
            closingRank: formData.otherState.obc.closingRank || null
          }],
          ews: [{
            year: formData.currentYear,
            totalSeats: formData.otherState.ews.totalSeats,
            openingRank: formData.otherState.ews.openingRank || null,
            closingRank: formData.otherState.ews.closingRank || null
          }],
          sc: [{
            year: formData.currentYear,
            totalSeats: formData.otherState.sc.totalSeats,
            openingRank: formData.otherState.sc.openingRank || null,
            closingRank: formData.otherState.sc.closingRank || null
          }],
          st: [{
            year: formData.currentYear,
            totalSeats: formData.otherState.st.totalSeats,
            openingRank: formData.otherState.st.openingRank || null,
            closingRank: formData.otherState.st.closingRank || null
          }]
        }
      };

      const response = await axios.post(
        `${import.meta.env.VITE_COLLEGE_PROFILE_URL}/profile/add-branch`,
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer kammugurjar`
          }
        }
      );

      setSuccess('Branch added successfully!');
      // Reset form or redirect after success
      setTimeout(() => navigate('/college/profile'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add branch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Branch</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branch Selection */}
        <div className="form-group">
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
            Select Branch
          </label>
          <select
            id="branch"
            value={selectedBranch}
            onChange={handleBranchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">-- Select a branch --</option>
            {branches.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>

        {/* General Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 mb-1">
              Total Seats
            </label>
            <input
              type="number"
              id="totalSeats"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentYear" className="block text-sm font-medium text-gray-700 mb-1">
              Current Year
            </label>
            <input
              type="number"
              id="currentYear"
              name="currentYear"
              value={formData.currentYear}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              readOnly
            />
          </div>
        </div>

        {/* Home State Ranks */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Home State Ranks</h2>
          <div className="space-y-4">
            {['gen', 'obc', 'ews', 'sc', 'st'].map((category) => (
              <div key={`home-${category}`} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {category.toUpperCase()} Total Seats
                  </label>
                  <input
                    type="number"
                    value={formData.homeState[category].totalSeats}
                    onChange={(e) => handleCategoryChange('homeState', category, 'totalSeats', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                
              </div>
            ))}
          </div>
        </div>

        {/* Other State Ranks */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Other State Ranks</h2>
          <div className="space-y-4">
            {['gen', 'obc', 'ews', 'sc', 'st'].map((category) => (
              <div key={`other-${category}`} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {category.toUpperCase()} Total Seats
                  </label>
                  <input
                    type="number"
                    value={formData.otherState[category].totalSeats}
                    onChange={(e) => handleCategoryChange('otherState', category, 'totalSeats', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Add Branch'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBranchPage;