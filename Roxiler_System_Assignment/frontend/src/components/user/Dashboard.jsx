import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loading from "../common/Loading";
import { useAuth } from "../../context/AuthContext";
import { Star, Store, User, TrendingUp } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRatings: 0,
    averageRating: 0,
    totalStores: 0,
  });
  const [recentRatings, setRecentRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ratingsResponse, storesResponse] = await Promise.all([
        api.get("/ratings/user"),
        api.get("/stores"),
      ]);

      const userRatings = ratingsResponse.data;
      const allStores = storesResponse.data;

      setStats({
        totalRatings: userRatings.length,
        averageRating:
          userRatings.length > 0
            ? userRatings.reduce((sum, rating) => sum + rating.rating, 0) /
              userRatings.length
            : 0,
        totalStores: allStores.length,
      });

      setRecentRatings(userRatings.slice(0, 5));
    } catch (error) {
      setError("Failed to load dashboard data");
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 transition-colors ${
            i < rating
              ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
              : "text-gray-300"
          }`}
        />
      ));
  };

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center shadow-md">
            <User className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-sm opacity-90">
              Discover and rate amazing stores in your area
            </p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded shadow-sm">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl hover:shadow-xl transition p-5">
          <div className="flex items-center">
            <Star className="h-7 w-7 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-gray-500">My Ratings</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalRatings}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs font-medium text-yellow-600">
            Total ratings given
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl hover:shadow-xl transition p-5">
          <div className="flex items-center">
            <TrendingUp className="h-7 w-7 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-gray-500">
                Average Rating
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averageRating.toFixed(1)}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs font-medium text-green-600">
            Your rating average
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl hover:shadow-xl transition p-5">
          <div className="flex items-center">
            <Store className="h-7 w-7 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-semibold text-gray-500">
                Available Stores
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalStores}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs">
            <Link
              to="/user/stores"
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Explore stores →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-md rounded-xl">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/user/stores"
            className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <Store className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <h4 className="font-semibold text-gray-800">Browse Stores</h4>
              <p className="text-xs text-gray-500">
                Discover and rate new stores
              </p>
            </div>
          </Link>

          <Link
            to="/user/profile"
            className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 transition"
          >
            <User className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <h4 className="font-semibold text-gray-800">My Profile</h4>
              <p className="text-xs text-gray-500">
                Update your account settings
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Ratings */}
      <div className="bg-white shadow-md rounded-xl">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Ratings
          </h3>
          <Link
            to="/user/stores"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all
          </Link>
        </div>

        {recentRatings.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Star className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-3 text-base font-semibold text-gray-800">
              No ratings yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start rating stores to see your activity here.
            </p>
            <div className="mt-6">
              <Link
                to="/user/stores"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Rate Your First Store
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentRatings.map((rating) => (
              <div
                key={rating.id}
                className="px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {rating.store_name}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="flex">{renderStars(rating.rating)}</div>
                      <span className="ml-2 text-sm font-medium text-gray-600">
                        {rating.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </p>
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

export default UserDashboard;
