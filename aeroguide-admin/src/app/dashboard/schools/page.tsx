'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, School } from '@/lib/api';
import Link from 'next/link';
import {
  Plus,
  Search,
  Star,
  MapPin,
  Users,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';

export default function SchoolsPage() {
  const { token } = useAuth();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    fetchSchools();
  }, [token]);

  async function fetchSchools() {
    if (!token) return;

    setLoading(true);
    const { data, error } = await api.getSchools(token, { limit: 100 });
    if (error) {
      setError(error);
    } else if (data) {
      setSchools(data.schools);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this school?')) return;

    const { error } = await api.deleteSchool(token!, id);
    if (error) {
      alert('Failed to delete school: ' + error);
    } else {
      setSchools(schools.filter((s) => s.id !== id));
    }
    setActiveMenu(null);
  }

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.location.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
          <p className="text-gray-600 mt-1">Manage flight schools</p>
        </div>
        <Link
          href="/dashboard/schools/new"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add School
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search schools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      {/* Schools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="aspect-video relative">
              <img
                src={school.image_url}
                alt={school.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === school.id ? null : school.id)
                    }
                    className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                  {activeMenu === school.id && (
                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border z-10">
                      <Link
                        href={`/dashboard/schools/${school.id}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                      <Link
                        href={`/dashboard/schools/${school.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(school.id)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {!school.is_active && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Inactive
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{school.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4" />
                {school.location}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{school.rating}</span>
                  <span className="text-gray-400">
                    ({school.reviews_count} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Users className="h-4 w-4" />
                  {school.students}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSchools.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No schools found</p>
        </div>
      )}
    </div>
  );
}
