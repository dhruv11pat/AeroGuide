'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Star, Check, X, Trash2, Search, Filter } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  text: string;
  course: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user: { name: string; email: string; picture: string | null };
  school: { name: string; location: string };
}

export default function ReviewsPage() {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('pending');

  useEffect(() => {
    fetchReviews();
  }, [token, filter]);

  async function fetchReviews() {
    if (!token) return;

    setLoading(true);
    const { data, error } = await api.getReviews(token, {
      status: filter === 'all' ? undefined : filter,
      limit: 100,
    });
    if (error) {
      setError(error);
    } else if (data) {
      setReviews(data.reviews);
    }
    setLoading(false);
  }

  async function handleUpdateStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await api.updateReviewStatus(token!, id, status);
    if (error) {
      alert('Failed to update review: ' + error);
    } else {
      setReviews(
        reviews.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this review?')) return;

    const { error } = await api.deleteReview(token!, id);
    if (error) {
      alert('Failed to delete review: ' + error);
    } else {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-1">Moderate user reviews</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {review.user.picture ? (
                  <img
                    src={review.user.picture}
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium text-lg">
                      {review.user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {review.user.name}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[review.status]}`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{review.user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      for {review.school.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {review.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(review.id, 'approved')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(review.id, 'rejected')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Course:</span> {review.course}
              </p>
              <p className="text-gray-700">{review.text}</p>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No reviews found</p>
        </div>
      )}
    </div>
  );
}
