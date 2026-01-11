'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, School, CreateSchoolInput } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  Trash2,
  Plus
} from 'lucide-react';

export default function EditSchoolPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    programs: []
  });

  // Load School Data
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
        // Map data to form structure
        // Remove IDs from programs to treat them as editable inputs
        // In a more complex scenario you might want to track IDs to update rather than replace
        setFormData({
            name: data.school.name,
            location: data.school.location,
            full_address: data.school.full_address || '',
            image_url: data.school.image_url,
            pricing: data.school.pricing,
            duration: data.school.duration,
            certifications: data.school.certifications,
            phone: data.school.phone || '',
            email: data.school.email || '',
            website: data.school.website || '',
            established: data.school.established,
            fleet_size: data.school.fleet_size,
            instructors: data.school.instructors,
            description: data.school.description || '',
            features: data.school.features,
            programs: data.school.training_programs?.map(({ id, ...rest }) => rest) || []
        });
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value ? parseInt(value) : undefined }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'certifications' | 'features') => {
    // Assuming comma-separated values for simplicity
    const values = e.target.value.split(',').map(v => v.trim()).filter(v => v);
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  // Program Management Helpers
  const addProgram = () => {
    setFormData(prev => ({
        ...prev,
        programs: [...(prev.programs || []), { name: '', description: '', duration: '', price: '' }]
    }));
  };

  const updateProgram = (index: number, field: string, value: string) => {
    const newPrograms = [...(formData.programs || [])];
    newPrograms[index] = { ...newPrograms[index], [field]: value };
    setFormData(prev => ({ ...prev, programs: newPrograms }));
  };

  const removeProgram = (index: number) => {
    const newPrograms = [...(formData.programs || [])];
    newPrograms.splice(index, 1);
    setFormData(prev => ({ ...prev, programs: newPrograms }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !params.id) return;

    setSubmitting(true);
    setError(null);

    const { error } = await api.updateSchool(token, params.id as string, formData);
    
    if (error) {
      setError(error);
      setSubmitting(false);
    } else {
      router.push(`/dashboard/schools/${params.id}`);
    }
  }

  if (loading) {
     return (
        <div className="flex items-center justify-center h-64">
           <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
     );
  }

  if (error && !formData.name) {
      return (
          <div className="text-center py-12 bg-red-50 rounded-lg">
              <div className="text-red-600 mb-4">{error}</div>
              <Link href="/dashboard/schools" className="text-primary-600 hover:text-primary-700">
                  &larr; Back to Schools
              </Link>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link
          href={`/dashboard/schools/${params.id}`}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit School</h1>
          <p className="text-gray-600 mt-1">Update school information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (City, State) *</label>
              <input
                required
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <input
                type="text"
                name="full_address"
                value={formData.full_address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
              <input
                required
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
               />
            </div>
          </div>
        </div>

        {/* Contact & Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Contact & Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                   type="tel"
                   name="phone"
                   value={formData.phone}
                   onChange={handleChange}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                   type="text"
                   name="website"
                   value={formData.website}
                   onChange={handleChange}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
             </div>
          </div>
          
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                 <input
                    type="number"
                    name="established"
                    value={formData.established || ''}
                    onChange={handleNumberChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Fleet Size</label>
                 <input
                    type="number"
                    name="fleet_size"
                    value={formData.fleet_size || ''}
                    onChange={handleNumberChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Instructors</label>
                 <input
                    type="number"
                    name="instructors"
                    value={formData.instructors || ''}
                    onChange={handleNumberChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Guide *</label>
                  <input
                    required
                    type="text"
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    placeholder="e.g. $10,000 - $15,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
               </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Duration *</label>
                  <input
                    required
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 6-12 months"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
               </div>
           </div>
        </div>

        {/* Arrays: Certs & Features */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
           <h2 className="text-lg font-semibold text-gray-900">Certifications & Features</h2>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certifications (comma separated)</label>
              <input
                type="text"
                value={formData.certifications?.join(', ')}
                onChange={(e) => handleArrayChange(e, 'certifications')}
                placeholder="PPL, CPL, IR, CFI"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
           </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
              <input
                type="text"
                value={formData.features?.join(', ')}
                onChange={(e) => handleArrayChange(e, 'features')}
                placeholder="Housing Available, Financing, Career Support"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
           </div>
        </div>

        {/* Training Programs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Training Programs</h2>
              <button
                type="button"
                onClick={addProgram}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-100 transition-colors"
              >
                 <Plus className="w-4 h-4" /> Add Program
              </button>
           </div>
           
           <div className="space-y-4">
              {(formData.programs || []).map((program, index) => (
                 <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 relative bg-gray-50/50">
                    <button
                       type="button"
                       onClick={() => removeProgram(index)}
                       className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Program Name</label>
                          <input
                             type="text"
                             value={program.name}
                             onChange={(e) => updateProgram(index, 'name', e.target.value)}
                             className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                             placeholder="Private Pilot License"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                          <input
                             type="text"
                             value={program.price}
                             onChange={(e) => updateProgram(index, 'price', e.target.value)}
                             className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                             placeholder="$10,000"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
                          <input
                             type="text"
                             value={program.duration}
                             onChange={(e) => updateProgram(index, 'duration', e.target.value)}
                             className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                             placeholder="3 months"
                          />
                       </div>
                       <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                          <input
                             type="text"
                             value={program.description}
                             onChange={(e) => updateProgram(index, 'description', e.target.value)}
                             className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                             placeholder="Comprehensive ground and flight training..."
                          />
                       </div>
                    </div>
                 </div>
              ))}
              {(formData.programs || []).length === 0 && (
                 <p className="text-gray-500 text-sm text-center py-4 italic">No training programs added yet.</p>
              )}
           </div>
        </div>

        {/* Error Message */}
        {error && (
           <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
           </div>
        )}

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Link
            href={`/dashboard/schools/${params.id}`}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
