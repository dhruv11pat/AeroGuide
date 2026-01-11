'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, School } from '@/lib/api';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  DollarSign,
  Clock,
  Phone,
  Mail,
  Globe,
  Award,
  Check,
  Calendar,
  Plane,
  User,
} from 'lucide-react';

export default function SchoolDetailsPage() {
  const params = useParams();
  const { token } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && params.id) {
      fetchSchool(params.id as string);
    }
  }, [token, params.id]);

  async function fetchSchool(id: string) {
    setLoading(true);
    const { data, error } = await api.getSchool(token!, id);
    if (error) {
      setError(error);
    } else if (data) {
      setSchool(data.school);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <div className="text-red-600 mb-4">{error || 'School not found'}</div>
        <Link
          href="/dashboard/schools"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          &larr; Back to Schools
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/schools"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{school.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/schools/${school.id}/edit`}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            Edit School
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image & Key Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="aspect-video relative h-64 w-full">
              <img
                src={school.image_url}
                alt={school.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                {!school.is_active && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Inactive
                  </span>
                )}
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900 flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  {school.rating} ({school.reviews_count} reviews)
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 divide-x divide-gray-100 border-t border-gray-100">
              <div className="p-4 text-center">
                <div className="text-sm text-gray-500 mb-1">Students</div>
                <div className="font-semibold text-gray-900 flex items-center justify-center gap-1">
                  <Users className="h-4 w-4 text-primary-500" />
                  {school.students}
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-sm text-gray-500 mb-1">Fleet Size</div>
                <div className="font-semibold text-gray-900 flex items-center justify-center gap-1">
                  <Plane className="h-4 w-4 text-primary-500" />
                  {school.fleet_size || '-'}
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-sm text-gray-500 mb-1">Instructors</div>
                <div className="font-semibold text-gray-900 flex items-center justify-center gap-1">
                  <User className="h-4 w-4 text-primary-500" />
                  {school.instructors || '-'}
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-sm text-gray-500 mb-1">Established</div>
                <div className="font-semibold text-gray-900 flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  {school.established || '-'}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 whitespace-pre-line">{school.description}</p>
          </div>

          {/* Training Programs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Programs</h2>
            {school.training_programs && school.training_programs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {school.training_programs.map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{program.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{program.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {program.duration}
                      </div>
                      <div className="font-medium text-primary-600">
                        {program.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No programs listed.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              {school.full_address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 break-words">{school.full_address}</span>
                </div>
              )}
              {school.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href={`tel:${school.phone}`} className="text-primary-600 hover:text-primary-700 transition-colors">
                    {school.phone}
                  </a>
                </div>
              )}
              {school.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a href={`mailto:${school.email}`} className="text-primary-600 hover:text-primary-700 transition-colors break-all">
                    {school.email}
                  </a>
                </div>
              )}
              {school.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <a 
                    href={school.website.startsWith('http') ? school.website : `https://${school.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 transition-colors break-all"
                  >
                    {school.website}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-medium text-gray-900 mb-2">Base Pricing</h3>
              <div className="flex items-center gap-2 text-2xl font-bold text-primary-600">
                <DollarSign className="h-6 w-6" />
                {school.pricing}
              </div>
              <p className="text-sm text-gray-500 mt-1">Starting price</p>
            </div>
          </div>

          {/* Certifications & Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {school.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  <Award className="h-3 w-3" />
                  {cert}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-4 pt-6 border-t border-gray-100">Features</h2>
            <ul className="space-y-2">
              {school.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
