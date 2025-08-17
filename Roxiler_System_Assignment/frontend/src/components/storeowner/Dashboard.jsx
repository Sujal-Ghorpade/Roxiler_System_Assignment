import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Loading from '../common/Loading';
import { Store, Star, BarChart3, MapPin, Mail, Link } from 'lucide-react';

const StoreOwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyStores();
  }, []);

  const fetchMyStores = async () => {
    try {
      const response = await api.get('/stores/owner');
      setStores(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load your store statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading your stores..." />;

  const totalStores = stores.length;
  const totalRatings = stores.reduce((sum, s) => sum + (s.total_ratings || 0), 0);
  const avgRating = totalRatings > 0
    ? (stores.reduce((sum, s) => sum + (parseFloat(s.average_rating) || 0) * (s.total_ratings || 0), 0) / totalRatings).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Store className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Store Dashboard</h1>
            <p className="text-sm text-gray-600">Overview of your stores and performance</p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <Store className="h-6 w-6 text-purple-600" />
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">Total Stores</dt>
              <dd className="text-lg font-medium text-gray-900">{totalStores}</dd>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <Star className="h-6 w-6 text-yellow-500" />
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">Total Ratings</dt>
              <dd className="text-lg font-medium text-gray-900">{totalRatings}</dd>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">Average Rating</dt>
              <dd className="text-lg font-medium text-gray-900">{avgRating}</dd>
            </div>
          </div>
        </div>
      </div>

      {/* List  of Stores*/}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            My Stores ({stores.length})
          </h3>
        </div>

        {stores.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Store className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No stores assigned</h3>
            <p className="mt-1 text-sm text-gray-500">An admin needs to assign you a store.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {stores.map((store) => (
              <div key={store.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{store.name}</h4>
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    {parseFloat(store.average_rating).toFixed(1)} ({store.total_ratings} reviews)
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {store.email}
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                    <span className="line-clamp-2">{store.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
