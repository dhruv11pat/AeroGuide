'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, CreateSchoolInput, TrainingProgram } from '@/lib/api';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Loader2,
  ImageIcon,
} from 'lucide-react';
import Link from 'next/link';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const CERTIFICATIONS = [
  'Part 61', 'Part 141', 'Private Pilot', 'Instrument Rating',
  'Commercial Pilot', 'Multi-Engine', 'CFI', 'CFII', 'ATP'
];

const DEFAULT_FEATURES = [
  'Modern Training Fleet',
  'Experienced Instructors',
  'Flexible Scheduling',
  'Ground School',
  'Simulator Training',
  'Career Placement',
  'Financial Aid Available',
  'Housing Assistance'
];

export default function NewSchoolPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateSchoolInput>({
    name: '',
    location: '',
    full_address: '',
    image_url: '',
    pricing: '',
    duration: '',
    certifications: [],
    phone: '',
    email: '',
    website: '',
    established: undefined,
    fleet_size: undefined,
    instructors: undefined,
    description: '',
    features: [],
    programs: [],
  });

  const [newProgram, setNewProgram] = useState<Omit<TrainingProgram, 'id'>>({
    name: '',
    description: '',
    duration: '',
    price: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleCertificationToggle = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications?.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...(prev.certifications || []), cert],
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...(prev.features || []), feature],
    }));
  };

  const handleAddProgram = () => {
    if (!newProgram.name || !newProgram.description || !newProgram.duration || !newProgram.price) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      programs: [...(prev.programs || []), newProgram],
    }));
    setNewProgram({ name: '', description: '', duration: '', price: '' });
  };

  const handleRemoveProgram = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await api.createSchool(token!, formData);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push('/dashboard/schools');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/schools"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New School</h1>
          <p className="text-gray-600 mt-1">Fill in the details to onboard a new flight school</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., SkyHigh Aviation Academy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location (City, State) *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., San Diego, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <input
                type="text"
                name="full_address"
                value={formData.full_address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 123 Airport Rd, San Diego, CA 92101"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://..."
                />
                {formData.image_url && (
                  <div className="w-16 h-10 rounded border overflow-hidden">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell prospective students about this school..."
              />
            </div>
          </div>
        </section>

        {/* Training Details */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pricing Range *
              </label>
              <input
                type="text"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., $8,000 - $15,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Training Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 3-6 months"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fleet Size
              </label>
              <input
                type="number"
                name="fleet_size"
                value={formData.fleet_size || ''}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Instructors
              </label>
              <input
                type="number"
                name="instructors"
                value={formData.instructors || ''}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year Established
              </label>
              <input
                type="number"
                name="established"
                value={formData.established || ''}
                onChange={handleChange}
                min="1900"
                max="2030"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 2005"
              />
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certifications Offered
            </label>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert) => (
                <button
                  key={cert}
                  type="button"
                  onClick={() => handleCertificationToggle(cert)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.certifications?.includes(cert)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., info@skyhigh.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., https://www.skyhigh.com"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Features & Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_FEATURES.map((feature) => (
              <button
                key={feature}
                type="button"
                onClick={() => handleFeatureToggle(feature)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  formData.features?.includes(feature)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </section>

        {/* Training Programs */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Programs</h2>

          {/* Existing programs */}
          {formData.programs && formData.programs.length > 0 && (
            <div className="space-y-3 mb-6">
              {formData.programs.map((program, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{program.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Duration: {program.duration}</span>
                      <span>Price: {program.price}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProgram(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add new program */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">Add Program</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Program Name"
                value={newProgram.name}
                onChange={(e) =>
                  setNewProgram((p) => ({ ...p, name: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 6-8 weeks)"
                value={newProgram.duration}
                onChange={(e) =>
                  setNewProgram((p) => ({ ...p, duration: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Price (e.g., $12,000)"
                value={newProgram.price}
                onChange={(e) =>
                  setNewProgram((p) => ({ ...p, price: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <textarea
                placeholder="Description"
                value={newProgram.description}
                onChange={(e) =>
                  setNewProgram((p) => ({ ...p, description: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm md:col-span-2"
                rows={2}
              />
            </div>
            <button
              type="button"
              onClick={handleAddProgram}
              disabled={!newProgram.name || !newProgram.description || !newProgram.duration || !newProgram.price}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              Add Program
            </button>
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/schools"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Create School
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
