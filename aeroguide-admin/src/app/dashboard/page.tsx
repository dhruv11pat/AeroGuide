'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, DashboardStats } from '@/lib/api';
import {
  GraduationCap,
  Users,
  Star,
  MessageSquare,
  Mail,
  TrendingUp,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      if (!token) return;

      const { data, error } = await api.getStats(token);
      if (error) {
        setError(error);
      } else if (data) {
        setStats(data);
      }
      setLoading(false);
    }

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        Error loading dashboard: {error}
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Schools',
      value: stats?.stats.schools || 0,
      icon: GraduationCap,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Users',
      value: stats?.stats.users || 0,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Reviews',
      value: stats?.stats.reviews.total || 0,
      pending: stats?.stats.reviews.pending || 0,
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      name: 'Inquiries',
      value: stats?.stats.inquiries.total || 0,
      pending: stats?.stats.inquiries.pending || 0,
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      name: 'Messages',
      value: stats?.stats.messages.total || 0,
      pending: stats?.stats.messages.new || 0,
      icon: Mail,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to AeroGuide Admin Portal</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
                {stat.pending !== undefined && stat.pending > 0 && (
                  <p className="text-xs text-amber-600 mt-1">
                    {stat.pending} pending
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Recent Reviews
            </h2>
          </div>
          <div className="divide-y">
            {stats?.recent.reviews.length === 0 ? (
              <p className="px-5 py-4 text-gray-500 text-sm">No recent reviews</p>
            ) : (
              stats?.recent.reviews.map((review: any) => (
                <div key={review.id} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.school?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        by {review.user?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{review.rating}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              Recent Inquiries
            </h2>
          </div>
          <div className="divide-y">
            {stats?.recent.inquiries.length === 0 ? (
              <p className="px-5 py-4 text-gray-500 text-sm">No recent inquiries</p>
            ) : (
              stats?.recent.inquiries.map((inquiry: any) => (
                <div key={inquiry.id} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-sm text-gray-500">
                        {inquiry.school?.name}
                      </p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {inquiry.inquiry_type}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
